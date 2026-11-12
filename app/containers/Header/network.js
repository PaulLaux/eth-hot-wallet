import { arbitrum, base, mainnet, optimism, sepolia } from 'viem/chains';

// RPC endpoints default to keyless public nodes. Override them at build time, e.g.
//   MAINNET_RPC_URL=https://mainnet.infura.io/v3/<project-id> npm start
// (also SEPOLIA_, BASE_, ARBITRUM_ and OPTIMISM_RPC_URL).
// Chain IDs and explorers come from viem. chainId (when set) is checked against the node's
// eth_chainId and used for EIP-155 signing.
const fromViem = (group, chain, rpc) => ({ group, rpc, chainId: chain.id, tx_explorer: `${chain.blockExplorers.default.url}/tx/` });

// The network menu lists them in this order, under their group
const Network = {
  'Ethereum Mainnet': fromViem('Ethereum', mainnet, process.env.MAINNET_RPC_URL || 'https://ethereum-rpc.publicnode.com'),
  'Sepolia Testnet': fromViem('Ethereum', sepolia, process.env.SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com'),
  Base: fromViem('Layer 2', base, process.env.BASE_RPC_URL || 'https://base-rpc.publicnode.com'),
  'Arbitrum One': fromViem('Layer 2', arbitrum, process.env.ARBITRUM_RPC_URL || 'https://arbitrum-one-rpc.publicnode.com'),
  Optimism: fromViem('Layer 2', optimism, process.env.OPTIMISM_RPC_URL || 'https://optimism-rpc.publicnode.com'),
  'Local RPC': { group: 'Other', rpc: 'http://127.0.0.1:8545', tx_explorer: null },
  Offline: { group: 'Other', rpc: 'offline', tx_explorer: null },
};

export default Network;
