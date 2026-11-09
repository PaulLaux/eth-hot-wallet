# ETH-Hot-Wallet 

## Ethereum wallet with ERC20 support - A web wallet 

![eth-hot-wallet ethereum wallet preview](https://paullaux.github.io/eth-hot-wallet/docs/images/eth-hot-wallet-ethereum.PNG)

https://eth-hot-wallet.com

### Technical review article: [How to build an Ethereum Wallet web app (Medium)](https://medium.freecodecamp.org/how-to-build-an-ethereum-wallet-web-app-ac77dcaac573)

###### Created by Paul Laux, [@dr_laux](https://twitter.com/dr_laux) for announcements

### Core components

- [ ] [viem](https://viem.sh) for keys, signing and the Ethereum JSON-RPC API
- [ ] [React-boilerplate](https://github.com/react-boilerplate/react-boilerplate) as a wrapper of React JS, Redux, Saga, Reselect, ImmutableJS and more
- [ ] [Ant Design](https://github.com/ant-design/ant-design) React js components
- [ ] [Vite](https://vite.dev) for development and builds, [Vitest](https://vitest.dev) for tests
- [ ] Many others, See [package.json](https://github.com/PaulLaux/eth-hot-wallet/blob/master/package.json)


### API Providers

- [ ] [PublicNode](https://ethereum-rpc.publicnode.com) keyless JsonRPC endpoints by default (Main Net and Sepolia Testnet)
- [ ] [CoinGecko](https://www.coingecko.com/) as exchange rates provider

To use your own RPC provider (e.g. Infura or Alchemy), set it when starting or building:

```bash
MAINNET_RPC_URL=https://mainnet.infura.io/v3/<project-id> SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<project-id> npm start
```

The wallet checks that each endpoint serves the expected chain ID and signs transactions with it (EIP-155).


### Features

- [x] Keys derived from a BIP-39 seed in the browser; the seed is stored encrypted with your password (PBKDF2 + AES-GCM).
- [x] EIP-1559 fees and gas limits estimated automatically.
- [x] The wallet locks itself 15 minutes after unlocking.
- [x] Network selector including local and remote rpc 
- [x] Eth balance auto converted to btc/usd/euro.
- [x] Responsive design for mobile support.


#### ERC20 wallet and native token support
Eth-hot-wallet supports erc20 tokens. From the user side, the tokens will have the same look and feel like Ether. 
Like all other network communication in the wallet, calls to erc20 contracts are done inside `app/containers/Header/saga.js`, using viem's `readContract` / `writeContract` with its built-in `erc20Abi`.




### Todo

- [x] ERC20 native token support
- [x] Local storage
- [ ] Tests
- [ ] Event log
- [ ] CI for development and production
- [ ] External security audit
- [x] Upgrade to react 16


### Development

4 Major containers were created:

- Homepage container - all the actions related to the wallet (seed, encryption, addresses), see also `app/utils/wallet.js`.

- Header container - all the activities related to network communication (viem).

- SendTo container - state and actions related to sendTo modal, actual checks and sending is happening in header container.

![eth-hot-wallet send token preview](https://paullaux.github.io/eth-hot-wallet/docs/images/eth-hot-wallet-sendToken.jpg)


- TokenChooser container - allows the user to select which erc20 token will be used from a pre-defined list. The list of supported tokens can be found in `app/containers/TokenChooser/token-lists.js`. Each network requires a different list.

![eth-hot-wallet erc20 token chooser preview](https://paullaux.github.io/eth-hot-wallet/docs/images/eth-hot-wallet-erc20-tokenChooser.jpg)



#### npm scripts for eth-hot wallet:

Requires Node.js 20.19+ or 22.12+.

`npm start` to start development mode. Go to http://localhost:3001 - changes are reflected in realtime.

`npm run build` to create the bundle for publishing in `build/`, and `npm run preview` to serve it locally.

`npm test` to run the tests, `npm run lint` to lint.

## License

This project is licensed under the MIT license, Copyright (c) 2017 Paul Laux For more information see `LICENSE.md`.
