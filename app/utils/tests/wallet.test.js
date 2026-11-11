import { parseTransaction, recoverTransactionAddress } from 'viem';
import { newMnemonic, isMnemonicValid, createVault, openVault, addAddress, accountFor } from '../wallet';

// Standard test mnemonic; its m/44'/60'/0'/0/{0,1} addresses are well known
const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const address0 = '0x9858EfFD232B4033E47d90003D41EC34EcaEda94';
const address1 = '0x6Fac4D18c912343BF86fa7049364Dd4E424Ab9C0';

describe('wallet', () => {
  it('generates valid 12-word mnemonics and rejects invalid ones', () => {
    const generated = newMnemonic();
    expect(generated.split(' ')).toHaveLength(12);
    expect(isMnemonicValid(generated)).toBe(true);
    expect(isMnemonicValid(mnemonic.replace('about', 'abandon'))).toBe(false);
  });

  it('encrypts the mnemonic and derives addresses on the standard path', async () => {
    const vault = await createVault(mnemonic, 'password-123');
    expect(vault.addresses).toEqual([address0]);
    expect(JSON.stringify(vault)).not.toContain('abandon');
    expect(await openVault(vault, 'password-123')).toBe(mnemonic);
    await expect(openVault(vault, 'wrong-password')).rejects.toThrow('Invalid password');

    const vault2 = addAddress(vault, mnemonic);
    expect(vault2.addresses).toEqual([address0, address1]);
    expect(accountFor(vault2, mnemonic, address1).address).toBe(address1);
    expect(() => accountFor(vault2, mnemonic, '0x000000000000000000000000000000000000dEaD')).toThrow();
  });

  it('signs with the chain ID (EIP-155 replay protection) and the address key', async () => {
    const vault = addAddress(await createVault(mnemonic, 'password-123'), mnemonic);
    const serializedTransaction = await accountFor(vault, mnemonic, address1).signTransaction({
      chainId: 11155111, to: address0, value: 1n, nonce: 0, gas: 21000n, maxFeePerGas: 2n, maxPriorityFeePerGas: 1n,
    });
    expect(parseTransaction(serializedTransaction).chainId).toBe(11155111);
    expect(await recoverTransactionAddress({ serializedTransaction })).toBe(address1);
  });
});
