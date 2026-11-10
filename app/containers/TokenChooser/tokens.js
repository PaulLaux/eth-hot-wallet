import Network from 'containers/Header/network';
import tokenList from './tokens.tokenlist.json';

/**
 * Tokens of a network from tokens.tokenlist.json (tokenlists.org format), shaped for the app:
 * lowercase symbol (the key used everywhere), contractAddress, and the description / url extensions.
 * Main Net: top 10 ERC-20 tokens by CoinGecko market cap rank (Nov 2026).
 * Sepolia: test versions of popular tokens that have a faucet or can be wrapped.
 * Addresses, symbols and decimals were checked on-chain.
 */
export function tokensFor(networkName) {
  return tokenList.tokens
    .filter((t) => t.chainId === Network[networkName].chainId)
    .map(({ symbol, address, name, decimals, extensions }) => (
      { symbol: symbol.toLowerCase(), contractAddress: address, name, decimals, ...extensions }
    ));
}
