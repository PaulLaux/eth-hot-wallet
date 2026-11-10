import Network from 'containers/Header/network';
import tokenList from './tokens.tokenlist.json';

/**
 * Tokens of a network from tokens.tokenlist.json (tokenlists.org format), shaped for the app:
 * lowercase symbol (the key used everywhere), contractAddress, and the description / url extensions.
 * Main Net, Base, Arbitrum One and OP Mainnet: top 10 ERC-20 tokens by CoinGecko market cap rank
 * deployed on that chain (Nov 2026), skipping coins native to non-Ethereum chains (BNB, ICP, CAKE)
 * and tokenized funds for qualified investors (BUIDL, USDY). USDT and DAI count only where their
 * issuer runs the L2 version (Tether's USDT0, Maker's DAI bridge); USDT0 is listed as USDT so it
 * shares USDT's icon and rate.
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
