import Transaction from 'ethereumjs-tx';

const add0x = (input) =>
  (typeof input === 'string' && input.slice(0, 2) !== '0x') ? `0x${input}` : input;

const strip0x = (input) =>
  (typeof input === 'string' && input.slice(0, 2) === '0x') ? input.slice(2) : input;

/**
 * Build a signTransaction(txParams, callback) function for SignerProvider that signs
 * with an EIP-155 chain ID.
 *
 * eth-lightwallet's keystore.signTransaction() signs without a chain ID. Such transactions
 * are valid on every chain, so a transaction sent on a testnet could be replayed on mainnet
 * (this wallet uses the same addresses on all networks). This follows the same steps as
 * lightwallet (passwordProvider -> keyFromPassword -> exportPrivateKey) but includes chainId.
 *
 * @param  {object} keystore eth-lightwallet keystore, with passwordProvider set before sending
 * @param  {number} chainId  EIP-155 chain ID of the connected network
 *
 * @return {function} signTransaction(txParams, callback) => callback(err, '0x' + signedTx)
 */
export default function makeSignTransaction(keystore, chainId) {
  return (txParams, callback) => {
    keystore.passwordProvider((pwError, password) => {
      if (pwError) return callback(pwError);

      return keystore.keyFromPassword(password, (keyError, pwDerivedKey) => {
        if (keyError) return callback(keyError);

        try {
          const tx = new Transaction({
            nonce: add0x(txParams.nonce),
            gasPrice: add0x(txParams.gasPrice),
            gasLimit: add0x(txParams.gas),
            to: add0x(txParams.to),
            value: add0x(txParams.value),
            data: add0x(txParams.data),
            chainId,
          });
          const privateKey = keystore.exportPrivateKey(strip0x(txParams.from), pwDerivedKey);
          tx.sign(Buffer.from(privateKey, 'hex'));
          return callback(null, `0x${tx.serialize().toString('hex')}`);
        } catch (err) {
          return callback(err);
        }
      });
    });
  };
}
