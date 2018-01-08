const Network = {
  Offline: { rpc: 'offline', tx_explorer: null },
  'PoA Network': { rpc: 'https://core.poa.network', tx_explorer: 'https://core-explorer.poa.network/tx/' },
  'Sokol PoA Testnet': {rpc: 'https://sokol.poa.network', tx_explorer: 'https://sokol-explorer.poa.network/tx/'},
  'Kovan Testnet': { rpc: 'https://kovan.infura.io/DI0Ayd5pD4v0mFuuR3Zn', tx_explorer: 'https://ropsten.etherscan.io/tx/'},
  'Ropsten Testnet': { rpc: 'https://ropsten.infura.io/DI0Ayd5pD4v0mFuuR3Zn', tx_explorer: 'https://ropsten.etherscan.io/tx/' },
  'Local RPC': { rpc: 'http://127.0.0.1:8545', tx_explorer: null },
  'Main Net': { rpc: 'https://mainnet.infura.io/DI0Ayd5pD4v0mFuuR3Zn', tx_explorer: 'https://etherscan.io/tx/' },
};

module.exports = Network;
