/**
 * HD wallet: a BIP-39 mnemonic encrypted with the user's password (PBKDF2 + AES-GCM).
 * Addresses use the standard path m/44'/60'/0'/0/<index> and are stored unencrypted,
 * so a locked wallet can still show balances.
 */
import { bytesToHex, hexToBytes } from 'viem';
import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts';
import { validateMnemonic } from '@scure/bip39';

const PBKDF2_ITERATIONS = 600000;

export const newMnemonic = () => generateMnemonic(english);
export const isMnemonicValid = (mnemonic) => validateMnemonic(mnemonic, english);
const accountAt = (mnemonic, index) => mnemonicToAccount(mnemonic, { addressIndex: index });

async function aesKey(password, salt) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
  );
}

/** Encrypt the mnemonic and derive the first address */
export async function createVault(mnemonic, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await aesKey(password, salt), new TextEncoder().encode(mnemonic));
  return { salt: bytesToHex(salt), iv: bytesToHex(iv), data: bytesToHex(new Uint8Array(data)), addresses: [accountAt(mnemonic, 0).address] };
}

/** Decrypt the mnemonic; throws if the password is wrong */
export async function openVault(vault, password) {
  try {
    const key = await aesKey(password, hexToBytes(vault.salt));
    const data = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: hexToBytes(vault.iv) }, key, hexToBytes(vault.data));
    return new TextDecoder().decode(data);
  } catch {
    throw new Error('Invalid password');
  }
}

/** Return the vault with the next HD address added */
export const addAddress = (vault, mnemonic) =>
  ({ ...vault, addresses: [...vault.addresses, accountAt(mnemonic, vault.addresses.length).address] });

/** Signing account for one of the vault's addresses */
export function accountFor(vault, mnemonic, address) {
  const index = vault.addresses.indexOf(address);
  if (index < 0) throw new Error(`Address ${address} is not in this wallet`);
  return accountAt(mnemonic, index);
}
