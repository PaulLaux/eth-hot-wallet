import Web3 from 'web3';
import HookedWeb3Provider from 'vendor/hooked-web3-provider/hooked-web3-provider';
import BigNumber from 'bignumber.js';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectKeystore, makeSelectAddressList } from 'containers/HomePage/selectors';
import { changeBalance } from 'containers/HomePage/actions';

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

import {
  loadNetworkSuccess,
  loadNetworkError,

  checkBalancesSuccess,
  CheckBalancesError,
} from './actions';

import {
  LOAD_NETWORK,
  CHECK_BALANCES,
} from './constants';

import Network from './network';

function timer() {
  return new Promise((resolve) => setTimeout(() => resolve('timer end'), 600));
}

console.log('const web3 = new Web3();');
let web3 = {};
if (window.web3) {
  web3 = window.web3;
} else {
  web3 = new Web3();
  window.web3 = web3;
}


/**
 * connect to rpc and attach keystore as siger provider
 */
export function* loadNetwork(action) {
  try {
    const rpcAddress = Network[action.networkName];
    if (!rpcAddress) {
      throw new Error(action.networkName + ' network not found');
    }

    const keystore = yield select(makeSelectKeystore());

    if (keystore) {
      const web3Provider = new HookedWeb3Provider({
        host: rpcAddress,
        transaction_signer: keystore,
      });
      web3.setProvider(web3Provider);

      function getBlockNumberPromise() { // eslint-disable-line no-inner-declarations
        return new Promise((resolve, reject) => {
          web3.eth.getBlockNumber((err, data) => {
            if (err !== null) return reject(err);
            return resolve(data);
          });
        });
      }
      const blockNumber = yield call(getBlockNumberPromise);

      yield call(timer);

      yield put(loadNetworkSuccess(blockNumber));
    } else {
      throw new Error('keystore not initiated');
    }
  } catch (err) {
    const errorString = 'loadNetwork error - ' + err.message;
    yield put(loadNetworkError(errorString));
  }
}


function getBalancePromise(address) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}

export function* checkBalances() {
  try {
    let j = 0;
    const addressList = yield select(makeSelectAddressList());
    const addressListArr = addressList.keySeq().toArray();

    do {
      const addr = addressListArr[j];
      const balance = yield call(getBalancePromise, addr);
      yield put(changeBalance(addr, balance));
      j += 1;
    } while (j < addressListArr.length);

    yield put(checkBalancesSuccess());
  } catch (err) {
    const errorString = 'checkBalances error - ' + err.message;
    yield put(CheckBalancesError(errorString));
  }
}

const Ether = (1.0e18).toString();
const Gwei = (1.0e9).toString();
const maxGas = 25000;

export function* confirmSendTransaction() {
  try {
    const fromAddress = yield select(makeSelectFrom());
    const amount = yield select(makeSelectAmount());
    const toAddress = yield select(makeSelectTo());
    const gasPrice = yield select(makeSelectGasPrice());

    if (!web3.isAddress(fromAddress)) {
      throw new Error('Origin address invalid');
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
    const errorString = `confirmSendTransaction error - ${err.message}`;
    yield put(confirmSendTransactionError(errorString));
  }
}

export function* SendTransaction() {
  try {
    const fromAddress = yield select(makeSelectFrom());
    const amount = yield select(makeSelectAmount());
    const toAddress = yield select(makeSelectTo());
    const gasPrice = yield select(makeSelectGasPrice());

    const sendAmount = new BigNumber(amount).times(Ether);

    const sendParams = { from: fromAddress, to: toAddress, value: sendAmount, gasPrice: gasPrice, gas: maxGas };


    function sendTransactionPromise(params) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        web3.eth.sendTransaction(params, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const tx = yield call(sendTransactionPromise, sendParams);

    /*
    web3.eth.sendTransaction(sendParams, (err, txhash) => {
      console.log('error: ' + err);
      console.log('txhash: ' + txhash);
    });
    */

    yield put(sendTransactionSuccess(tx));
  } catch (err) {
    const errorString = `SendTransaction error - ${err.message}`;
    yield put(sendTransactionError(errorString));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_NETWORK, loadNetwork);
  yield takeLatest(CHECK_BALANCES, checkBalances);

  yield takeLatest(COMFIRM_SEND_TRANSACTION, confirmSendTransaction);
  yield takeLatest(SEND_TRANSACTION, SendTransaction);
}
