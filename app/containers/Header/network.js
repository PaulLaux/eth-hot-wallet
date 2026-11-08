// RPC endpoints default to keyless public nodes. Override them at build time, e.g.
//   MAINNET_RPC_URL=https://mainnet.infura.io/v3/<project-id> npm start
// chainId (when set) is checked against the node's eth_chainId and used for EIP-155 signing.
const Network = {
  Offline: { rpc: 'offline', tx_explorer: null },
  'Local RPC': { rpc: 'http://127.0.0.1:8545', tx_explorer: null },
  'Sepolia Testnet': {
    rpc: process.env.SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com',
    chainId: 11155111,
    tx_explorer: 'https://sepolia.etherscan.io/tx/',
  },
  'Main Net': {
    rpc: process.env.MAINNET_RPC_URL || 'https://ethereum-rpc.publicnode.com',
    chainId: 1,
    tx_explorer: 'https://etherscan.io/tx/',
  },
};

module.exports = Network;
