import { arbitrum, base, mainnet, optimism, sepolia } from 'viem/chains';

// RPC endpoints default to keyless public nodes. Override them at build time, e.g.
//   MAINNET_RPC_URL=https://mainnet.infura.io/v3/<project-id> npm start
// (also SEPOLIA_, BASE_, ARBITRUM_ and OPTIMISM_RPC_URL).
// Chain IDs and explorers come from viem. chainId (when set) is checked against the node's
// eth_chainId and used for EIP-155 signing.
const fromViem = (chain, rpc) => ({ rpc, chainId: chain.id, tx_explorer: `${chain.blockExplorers.default.url}/tx/` });

const Network = {
  Offline: { rpc: 'offline', tx_explorer: null },
  'Local RPC': { rpc: 'http://127.0.0.1:8545', tx_explorer: null },
  'Sepolia Testnet': fromViem(sepolia, process.env.SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com'),
  'Main Net': fromViem(mainnet, process.env.MAINNET_RPC_URL || 'https://ethereum-rpc.publicnode.com'),
  Base: fromViem(base, process.env.BASE_RPC_URL || 'https://base-rpc.publicnode.com'),
  'Arbitrum One': fromViem(arbitrum, process.env.ARBITRUM_RPC_URL || 'https://arbitrum-one-rpc.publicnode.com'),
  'OP Mainnet': fromViem(optimism, process.env.OPTIMISM_RPC_URL || 'https://optimism-rpc.publicnode.com'),
};

export default Network;
