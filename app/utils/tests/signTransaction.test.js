/**
 * Test EIP-155 transaction signing
 *
 * Runs in node: jsdom has no crypto.getRandomValues, which lightwallet's tweetnacl needs.
 * @vitest-environment node
 */

import lightwallet from 'eth-lightwallet';
import Transaction from 'ethereumjs-tx';
import makeSignTransaction from '../signTransaction';

const password = 'test-password';
const seedPhrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const hdPathString = "m/44'/60'/0'/0";
const SEPOLIA = 11155111;
const TIMEOUT = 60000; // scrypt key derivation runs on every signature

const txParams = (from) => ({
  from,
  to: '0x000000000000000000000000000000000000dead',
  value: '0x2386f26fc10000', // 0.01 eth
  gas: '0x5208',
  gasPrice: '0x3b9aca00',
  nonce: '0x7',
});

function createKeystore() {
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault({ password, seedPhrase, hdPathString }, (err, ks) => {
      if (err) return reject(err);
      return ks.keyFromPassword(password, (keyErr, pwDerivedKey) => {
        if (keyErr) return reject(keyErr);
        ks.generateNewAddress(pwDerivedKey, 1);
        return resolve(ks);
      });
    });
  });
}

const sign = (ks, chainId, params) => new Promise((resolve, reject) => {
  makeSignTransaction(ks, chainId)(params, (err, signed) => (err ? reject(err) : resolve(signed)));
});

describe('makeSignTransaction', () => {
  let ks;
  let address;

  beforeAll(() => createKeystore().then((created) => {
    ks = created;
    address = ks.getAddresses()[0];
  }), TIMEOUT);

  beforeEach(() => {
    ks.passwordProvider = (cb) => cb(null, password);
  });

  it('signs with the EIP-155 chain ID and the keystore key', () =>
    sign(ks, SEPOLIA, txParams(address)).then((signed) => {
      const tx = new Transaction(signed);
      expect(tx.getChainId()).toBe(SEPOLIA);
      expect([(SEPOLIA * 2) + 35, (SEPOLIA * 2) + 36]).toContain(parseInt(tx.v.toString('hex'), 16));
      expect(tx.verifySignature()).toBe(true);
      expect(`0x${tx.getSenderAddress().toString('hex')}`).toBe(address);
      expect(`0x${tx.to.toString('hex')}`).toBe('0x000000000000000000000000000000000000dead');
      expect(`0x${tx.nonce.toString('hex')}`).toBe('0x07');
    }), TIMEOUT);

  it('produces a different signature per chain', () =>
    Promise.all([sign(ks, 1, txParams(address)), sign(ks, SEPOLIA, txParams(address))])
      .then(([mainnet, sepolia]) => {
        expect(new Transaction(mainnet).getChainId()).toBe(1);
        expect(mainnet).not.toBe(sepolia);
      }), TIMEOUT);

  it('fixes lightwallet signing, which has no chain ID (replayable on any chain)', () =>
    new Promise((resolve, reject) => {
      ks.signTransaction(txParams(address), (err, signed) => (err ? reject(err) : resolve(signed)));
    }).then((signed) => {
      expect(new Transaction(signed).getChainId()).toBe(0);
    }), TIMEOUT);

  it('fails with a wrong password', () => {
    ks.passwordProvider = (cb) => cb(null, 'wrong-password');
    return sign(ks, SEPOLIA, txParams(address)).then(
      () => { throw new Error('expected signing to fail'); },
      (err) => expect(err.message).toMatch(/Incorrect derived key/),
    );
  }, TIMEOUT);
});
