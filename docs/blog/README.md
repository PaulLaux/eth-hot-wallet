# ETH-Hot-Wallet 

### Ethereum open source wallet / zero client

![eth-hot-wallet ethereum wallet preview](https://paullaux.github.io/eth-hot-wallet/docs/images/eth-hot-wallet-ethereum.PNG)


#### Version 0.1 - work in progress

##### Created by Paul Laux, [@drjackall](https://twitter.com/drjackall) for announcements

### Core components

- [ ] [LightWallet V3](https://github.com/ConsenSys/eth-lightwallet) 
- [ ] [Web3.js](https://github.com/ethereum/web3.js/) Ethereum JavaScript API
- [ ] [React-boilerplate](https://github.com/react-boilerplate/react-boilerplate) as a wrapper of React JS, Redux, Saga, Reselect, ImmutableJS and more
- [ ] [Ant Design](https://github.com/ant-design/ant-design) React js components
- [ ] Many others, See [package.json](https://github.com/PaulLaux/eth-hot-wallet/blob/master/package.json)


### API Providers

- [ ] [Infura.io](https://infura.io/) as JsonRPC provider
- [ ] [Coinmarketcap](https://coinmarketcap.com/) as exchange rates provider


### Features

- [x] Encryption keys generated from seed and stored in browser.
- [x] Network selector including local and remote rpc 
- [x] Eth balance auto converted to btc/usd/euro.
- [x] Responsive design for mobile support.


### Todo

- [ ] ERC20 native token support
- [ ] Local storage
- [ ] Tests
- [ ] Event log
- [ ] CI for development and production
- [ ] External security audit
- [ ] Upgrade to react 16.1


### Development

3 Major containers were created:

- Homepage container - contains all the actions related to keystore, including manipulation and usage.

- Header container - contains all the action related to network comunication / web3 api.

- Sendto container - contains state and actions related to sendto modal, actual checks and sending is happning in header container.

After build, webpack monitor will generates stats about bundle size:


![eth-hot-wallet webpack-monitor](https://paullaux.github.io/eth-hot-wallet/docs/images/webpack-monitor.JPG)

## License

This project is licensed under the MIT license, Copyright (c) 2017 Paul Laux For more information see `LICENSE.md`.