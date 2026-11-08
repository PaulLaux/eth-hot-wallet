import Web3 from 'web3';
import SignerProvider from 'vendor/ethjs-provider-signer/ethjs-provider-signer';
import BigNumber from 'bignumber.js';
import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects';

import {
  makeSelectKeystore,
  makeSelectPassword,
  makeSelectAddressMap,
  makeSelectTokenInfoList,
  makeSelectTokenInfo,
} from 'containers/HomePage/selectors';
import {
  changeBalance,
  setExchangeRates,
  updateTokenInfo,
} from 'containers/HomePage/actions';
import request from 'utils/request';

import {
  confirmSendTransactionSuccess,
  confirmSendTransactionError,
  sendTransactionSuccess,
  sendTransactionError,
} from 'containers/SendToken/actions';
import {
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectGasPrice,
  makeSelectSendTokenSymbol,
} from 'containers/SendToken/selectors';
import {
  COMFIRM_SEND_TRANSACTION,
  SEND_TRANSACTION,
} from 'containers/SendToken/constants';

import {
  timeBetweenCheckbalances,
  Ether,
  Gwei,
  maxGasForEthSend,
  maxGasForTokenSend,
  offlineModeString,
  coinGeckoPriceApi,
} from 'utils/constants';
import { timer } from 'utils/common';
import { erc20Abi } from 'utils/contracts/abi';
import makeSignTransaction from 'utils/signTransaction';
import { message } from 'antd';

import {
  makeSelectPrevNetworkName,
} from './selectors';
import {
  loadNetworkSuccess,
  loadNetworkError,

  checkBalances,
  checkBalancesSuccess,
  CheckBalancesError,
  stopPollingBalances,

  getExchangeRates,
  getExchangeRatesSuccess,
  getExchangeRatesError,
} from './actions';

import {
  LOAD_NETWORK,
  CHECK_BALANCES,
  CHECK_BALANCES_SUCCESS,
  CHECK_BALANCES_ERROR,
  STOP_POLL_BALANCES,
  GET_EXCHANGE_RATES,
} from './constants';

import Network from './network';
const web3 = new Web3(); // eslint-disable-line
const erc20Contract = web3.eth.contract(erc20Abi);

/* For development only, if online = false then most api calls will be replaced by constant values
* affected functions:
* loadNetwork() will connect to 'Local RPC' but default network name will be showen in gui
* getRates() will not call rate api
*/
const online = true;
if (!online) message.warn('Debug mode: online = false in Header/saga.js');

/**
 * Ask the node which chain it serves (EIP-695 eth_chainId)
 */
export function getChainIdPromise(provider) {
  return new Promise((resolve, reject) => {
    provider.sendAsync({ jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] }, (err, res) => {
      if (err) return reject(err instanceof Error ? err : new Error(err));
      if (res.error) return reject(new Error(res.error.message));
      return resolve(parseInt(res.result, 16));
    });
  });
}

/**
 * connect to rpc and attach keystore as siger provider
 */
export function* loadNetwork(action) {
  if (!online) {
    message.warn('debug mode: online = false in Header/saga.js');
  }
  try {
    const rpcAddress = online ? Network[action.networkName].rpc : Network['Local RPC'].rpc;
    if (!rpcAddress) {
      throw new Error(`${action.networkName} network not found`);
    }

    if (action.networkName === offlineModeString) {
      web3.setProvider(null);
      yield put(stopPollingBalances());
      yield put(loadNetworkError(offlineModeString));
      return;
    }

    const keystore = yield select(makeSelectKeystore());

    if (keystore) {
      let chainId = null; // set below, before the provider is attached to web3
      const provider = new SignerProvider(rpcAddress, {
        signTransaction: (txParams, callback) => makeSignTransaction(keystore, chainId)(txParams, callback),
        accounts: (cb) => cb(null, keystore.getAddresses()),
      });

      chainId = yield call(getChainIdPromise, provider);
      const expectedChainId = online ? Network[action.networkName].chainId : undefined;
      if (expectedChainId && chainId !== expectedChainId) {
        throw new Error(`RPC for ${action.networkName} serves chain ID ${chainId}, expected ${expectedChainId}`);
      }

      web3.setProvider(provider);

      function getBlockNumberPromise() { // eslint-disable-line no-inner-declarations
        return new Promise((resolve, reject) => {
          web3.eth.getBlockNumber((err, data) => {
            if (err !== null) return reject(err);
            return resolve(data);
          });
        });
      }
      const blockNumber = yield call(getBlockNumberPromise);

      yield call(timer, 600);

      yield put(loadNetworkSuccess(blockNumber));

      // actions after succesfull network load :
      yield put(checkBalances());
      yield put(getExchangeRates());

      // clear token list if changed network

      const prevNetwork = yield select(makeSelectPrevNetworkName());
      if (prevNetwork !== action.networkName) {
        yield put(updateTokenInfo(keystore.getAddresses(), action.tokenInfo));
      }
    } else {
      throw new Error('keystore not initiated - Create wallet before connecting');
    }
  } catch (err) {
    // const errorString = `loadNetwork error - ${err.message}`;
    yield put(loadNetworkError(err.message));
  }
  /* This will happen after successful network load */
}


export function* confirmSendTransaction() {
  try {
    const fromAddress = yield select(makeSelectFrom());
    const amount = yield select(makeSelectAmount());
    const toAddress = yield select(makeSelectTo());
    const gasPrice = yield select(makeSelectGasPrice());

    if (!web3.isAddress(fromAddress)) {
      throw new Error('Source address invalid');
    }

    if (amount <= 0) {
      throw new Error('Amount must be possitive');
    }

    if (!web3.isAddress(toAddress)) {
      throw new Error('Destenation address invalid');
    }

    if (!(gasPrice > 0.1)) {
      throw new Error('Gas price must be at least 0.1 Gwei');
    }

    const msg = `Transaction created successfully. 
    Sending ${amount} from ...${fromAddress.slice(-5)} to ...${toAddress.slice(-5)}`;
    yield put(confirmSendTransactionSuccess(msg));
  } catch (err) {
    // const errorString = `confirmSendTransaction error - ${err.message}`;
    yield put(confirmSendTransactionError(err.message));
  }
}

export function* SendTransaction() {
  const keystore = yield select(makeSelectKeystore());
  const origProvider = keystore.passwordProvider;
  try {
    const fromAddress = yield select(makeSelectFrom());
    const amount = yield select(makeSelectAmount());
    const toAddress = yield select(makeSelectTo());
    const gasPrice = new BigNumber(yield select(makeSelectGasPrice())).times(Gwei);
    const password = yield select(makeSelectPassword());

    const tokenToSend = yield select(makeSelectSendTokenSymbol());

    if (!password) {
      throw new Error('No password found - please unlock wallet before send');
    }
    if (!keystore) {
      throw new Error('No keystore found - please create wallet');
    }
    keystore.passwordProvider = (callback) => {
      // we cannot use selector inside this callback so we use a const value
      const ksPassword = password;
      callback(null, ksPassword);
    };

    let tx;
    if (tokenToSend === 'eth') {
      const sendAmount = new BigNumber(amount).times(Ether);
      const sendParams = { from: fromAddress, to: toAddress, value: sendAmount, gasPrice, gas: maxGasForEthSend };
      function sendTransactionPromise(params) { // eslint-disable-line no-inner-declarations
        return new Promise((resolve, reject) => {
          web3.eth.sendTransaction(params, (err, data) => {
            if (err !== null) return reject(err);
            return resolve(data);
          });
        });
      }
      tx = yield call(sendTransactionPromise, sendParams);
    } else { // any other token
      const tokenInfo = yield select(makeSelectTokenInfo(tokenToSend));
      if (!tokenInfo) {
        throw new Error(`Contract address for token '${tokenToSend}' not found`);
      }
      const contractAddress = tokenInfo.contractAddress;
      const sendParams = { from: fromAddress, value: '0x0', gasPrice, gas: maxGasForTokenSend };
      const tokenAmount = amount * (10 ** tokenInfo.decimals); // Big Number??

      function sendTokenPromise(tokenContractAddress, sendToAddress, sendAmount, params) { // eslint-disable-line no-inner-declarations
        return new Promise((resolve, reject) => {
          const tokenContract = erc20Contract.at(tokenContractAddress);
          tokenContract.transfer.sendTransaction(sendToAddress, sendAmount, params, (err, sendTx) => {
            if (err) return reject(err);
            return resolve(sendTx);
          });
        });
      }
      tx = yield call(sendTokenPromise, contractAddress, toAddress, tokenAmount, sendParams);
    }

    yield put(sendTransactionSuccess(tx));
  } catch (err) {
    const loc = err.message.indexOf('at runCall');
    const errMsg = (loc > -1) ? err.message.slice(0, loc) : err.message;
    yield put(sendTransactionError(errMsg));
  } finally {
    keystore.passwordProvider = origProvider;
  }
}


/* *************  Polling saga and polling flow for check balances ***************** */
export function getEthBalancePromise(address) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}

export function getTokenBalancePromise(address, tokenContractAddress) {
  return new Promise((resolve, reject) => {
    const tokenContract = erc20Contract.at(tokenContractAddress);
    tokenContract.balanceOf.call(address, (err, balance) => {
      if (err) return reject(err);
      return resolve(balance);
    });
  });
}


function* checkTokenBalance(address, symbol) {
  if (!address || !symbol) {
    return null;
  }
  const tokenInfo = yield select(makeSelectTokenInfo(symbol));
  const contractAddress = tokenInfo.contractAddress;

  const balance = yield call(getTokenBalancePromise, address, contractAddress);

  yield put(changeBalance(address, symbol, balance));

  return true;
}

function* checkTokensBalances(address) {
  const opt = {
    returnList: true,
    removeIndex: true,
    removeEth: true,
  };
  const tokenList = yield select(makeSelectAddressMap(address, opt));

  for (let i = 0; i < tokenList.length; i += 1) {
    const symbol = tokenList[i];
    // console.log('address: ' + address + ' token: ' + tokenList[i]);
    yield checkTokenBalance(address, symbol);
  }
  // console.log(tokenMap);
}

export function* checkAllBalances() {
  try {
    let j = 0;
    const addressList = yield select(makeSelectAddressMap(false, { returnList: true }));

    do { // Iterate over all addresses and check for balance
      const address = addressList[j];
      // handle eth
      const balance = yield call(getEthBalancePromise, address);
      yield put(changeBalance(address, 'eth', balance));

      // handle tokens
      yield checkTokensBalances(address);

      j += 1;
    } while (j < addressList.length);

    yield put(checkBalancesSuccess());
  } catch (err) {
    yield put(CheckBalancesError(err.message));
  }
}

// Utility function for delay effects
function delay(millisec) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), millisec);
  });
  return promise;
}

// Fetch data every X seconds
function* pollData() {
  try {
    // console.log('pollData');
    yield call(delay, timeBetweenCheckbalances);

    yield put(checkBalances());
  } catch (error) {
    // console.log('pollData Error');
    // cancellation error -- can handle this if you wish
  }
}

// Start Polling when first call to checkAllBalances succeded or fails
// Wait for successful response or fail, then fire another request
// Cancel polling on STOP_POLL_BALANCES
function* watchPollData() {
  while (true) { // eslint-disable-line
    yield take([CHECK_BALANCES_SUCCESS, CHECK_BALANCES_ERROR]);
    yield race([ // eslint-disable-line
      call(pollData),
      take(STOP_POLL_BALANCES),
    ]);
  }
}
/* ******************************************************************************** */

/**
 * Convert a CoinGecko /simple/price response ({ eth: { usd, eur, btc }, ... }) into the
 * [{ symbol, price_usd, price_eur, price_btc }] list that utils/unitConverter expects.
 * Coins missing any of the three prices are skipped.
 */
export function coinGeckoToRates(prices) {
  const currencies = ['usd', 'eur', 'btc'];
  return Object.keys(prices)
    .filter((symbol) => currencies.every((c) => typeof prices[symbol][c] === 'number'))
    .map((symbol) => ({
      symbol: symbol.toUpperCase(),
      price_usd: String(prices[symbol].usd),
      price_eur: String(prices[symbol].eur),
      price_btc: String(prices[symbol].btc),
    }));
}

/**
 * Get exchange rates for eth and all known tokens from CoinGecko
 */
export function* getRates() {
  try {
    const tokenList = yield select(makeSelectTokenInfoList());
    const symbols = ['eth', ...tokenList.filter((symbol) => symbol !== 'eth')];
    const requestURL = `${coinGeckoPriceApi}?symbols=${symbols.join(',')}&vs_currencies=usd,eur,btc`;

    const apiRates = online ?
      coinGeckoToRates(yield call(request, requestURL)) :
      require('./tests/dummyRates').dummyRates; // eslint-disable-line global-require

    yield put(setExchangeRates(apiRates, coinGeckoPriceApi, tokenList));
    yield put(getExchangeRatesSuccess());
  } catch (err) {
    yield put(getExchangeRatesError(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NETWORK, loadNetwork);
  yield takeLatest(COMFIRM_SEND_TRANSACTION, confirmSendTransaction);
  yield takeLatest(SEND_TRANSACTION, SendTransaction);
  yield takeLatest(GET_EXCHANGE_RATES, getRates);

  /* poll check balances */
  yield [
    fork(watchPollData),
    takeLatest(CHECK_BALANCES, checkAllBalances),
  ];
  /* End of poll check balances */
}
