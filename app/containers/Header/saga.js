import Web3 from 'web3';
import SignerProvider from 'vendor/ethjs-provider-signer/ethjs-provider-signer';
import BigNumber from 'bignumber.js';
import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects';

import { makeSelectKeystore, makeSelectAddressList } from 'containers/HomePage/selectors';
import { changeBalance, setExchangeRates } from 'containers/HomePage/actions';
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
} from 'containers/SendToken/selectors';
import {
  COMFIRM_SEND_TRANSACTION,
  SEND_TRANSACTION,
} from 'containers/SendToken/constants';

import { timeBetweenCheckbalances, Ether, Gwei, maxGasForSendEth, offlineModeString } from 'utils/constants';
import { timer } from 'utils/common';

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
const web3 = new Web3();

/**
 * connect to rpc and attach keystore as siger provider
 */
export function* loadNetwork(action) {
  try {
    const rpcAddress = Network[action.networkName];
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
      const provider = new SignerProvider(rpcAddress, {
        signTransaction: keystore.signTransaction.bind(keystore),
        accounts: (cb) => cb(null, keystore.getAddresses().map((a) => `0x${a}`)),
      });

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

    if (!gasPrice.gte(new BigNumber(1).times(Gwei))) {
      throw new Error('Gas price must be 1 Gwei at least');
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
  try {
    const fromAddress = yield select(makeSelectFrom());
    const amount = yield select(makeSelectAmount());
    const toAddress = yield select(makeSelectTo());
    const gasPrice = yield select(makeSelectGasPrice());

    const sendAmount = new BigNumber(amount).times(Ether);

    const sendParams = { from: fromAddress, to: toAddress, value: sendAmount, gasPrice, gas: maxGasForSendEth };

    function sendTransactionPromise(params) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        web3.eth.sendTransaction(params, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const tx = yield call(sendTransactionPromise, sendParams);

    yield put(sendTransactionSuccess(tx));
  } catch (err) {
    yield put(sendTransactionError(err.message));
  }
}


/* *************  Polling saga and polling flow for check balances ***************** */
function getBalancePromise(address) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}

export function* checkAllBalances() {
  try {
    let j = 0;
    const addressList = yield select(makeSelectAddressList());
    const addressListArr = addressList.keySeq().toArray();

    do { // Iterate over all addresses and check for balance
      const addr = addressListArr[j];
      const balance = yield call(getBalancePromise, addr);
      yield put(changeBalance(addr, balance));
      j += 1;
    } while (j < addressListArr.length);

    yield put(checkBalancesSuccess());
  } catch (err) {
    yield put(CheckBalancesError(err.message));
  }
}

// Utility function to delay effects
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
 * Get exchange rates from api
 */
export function* getRates() {
  const requestURL = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR';
  try {
    // Call our request helper (see 'utils/request')
    // const apiRates = (yield call(request, requestURL))[0];
    const apiRates =
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        rank: '2',
        price_usd: '295.412',
        price_btc: '0.0684231',
        '24h_volume_usd': '308964000.0',
        market_cap_usd: '28043053731.0',
        available_supply: '94928621.0',
        total_supply: '94928621.0',
        percent_change_1h: '-1.46',
        percent_change_24h: '-1.84',
        percent_change_7d: '1.35',
        last_updated: '1507010353',
        price_eur: '252.342998284',
        '24h_volume_eur': '263919211.548',
        market_cap_eur: '23954572799.0',
      };
    // console.log(apiPrices);
    // extract(apiRates, requestURL);
    yield put(setExchangeRates(apiRates, requestURL));
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
