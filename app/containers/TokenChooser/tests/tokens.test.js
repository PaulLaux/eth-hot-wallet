import { getAddress } from 'viem';
import Network from 'containers/Header/network';
import tokenList from '../tokens.tokenlist.json';
import { tokensFor } from '../tokens';

describe('tokens.tokenlist.json', () => {
  const chainIds = Object.values(Network).map((n) => n.chainId);

  it.each(tokenList.tokens)('$symbol on chain $chainId has a known chain and a checksummed address', (t) => {
    expect(chainIds).toContain(t.chainId);
    expect(getAddress(t.address)).toBe(t.address);
  });

  it('has each symbol once per chain, since the app uses symbols as keys', () => {
    const keys = tokenList.tokens.map((t) => `${t.chainId} ${t.symbol.toLowerCase()}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('tokensFor', () => {
  it('returns the tokens of a network in the app shape', () => {
    expect(tokensFor('Sepolia Testnet')).toContainEqual({
      symbol: 'usdc',
      contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      name: 'USD Coin (Sepolia)',
      decimals: 6,
      description: 'Test token from the Circle faucet',
      url: 'https://faucet.circle.com/',
    });
  });

  it('returns no tokens for networks without a chain ID', () => {
    expect(tokensFor('Offline')).toEqual([]);
    expect(tokensFor('Local RPC')).toEqual([]);
  });
});
