
export const TokenSelection = {
  Offline: [],
  'Local RPC': [],
  'Ropsten Testnet': [
    {
      symbol: 'eos',
      name: 'EOS',
      contractAddress: '0x86fa049857e0209aa7d5e616f7eb3b3b78ecfdb0',
      decimals: 18,
      description: 'Infrastructure for Decentralized Applications',
    },
    {
      symbol: 'symb',
      name: 'Sample',
      contractAddress: '0x0a460180ec4fd3d5eb9dca8f84e8ca45b2ad9160',
      decimals: 18,
      description: 'The most distributed token ever',
      url: 'https://google.com',
    },
    {
      symbol: 'sym2',
      name: 'Sample2',
      contractAddress: '0x0a460180ec4fd3d5eb9dca8f84e8ca45b2ad9160',
      decimals: 18,
      description: 'The second most distributed token ever',
      url: 'https://google.com',
    },
  ],
  'Main Net': [
    {
      symbol: 'eos',
      name: 'EOS',
      contractAddress: '0x86fa049857e0209aa7d5e616f7eb3b3b78ecfdb0',
      decimals: 18,
      description: 'Infrastructure for Decentralized Applications',
      url: 'google.com',
    },
    {
      symbol: 'trx',
      name: 'Tron',
      contractAddress: '',
      decimals: 18,
      description: 'TRON is a blockchain-based decentralized protocol that aims to construct a worldwide free content entertainment system with the blockchain and distributed storage technology.',
    },
    {
      symbol: 'qtm',
      name: 'Qtum',
      contractAddress: '',
      decimals: 18,
      description: 'Build Decentralized Applications that Simply Work Executable on mobile devices, compatible with major ',
    },
    {
      symbol: 'omg',
      name: 'OmiseGo',
      contractAddress: '',
      decimals: 18,
      description: 'OmiseGO (OMG) is a public Ethereum-based financial technology for use in mainstream digital wallets',
    },
  ],
};

export default TokenSelection;
/*
{
  symbol: '',
  name: '',
  contractAddress: '',
  decimals: 18,
  description: '',
},
*/
