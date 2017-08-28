import Web3 from 'web3';
import HookedWeb3Provider from 'vendor/hooked-web3-provider/hooked-web3-provider';

import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectKeystore, makeSelectAddressList } from 'containers/HomePage/selectors';
import { changeBalance } from 'containers/HomePage/actions';

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

// console.log(window);
const web3 = new Web3();

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


export function* checkBalances() {
  try {
    const addressList = yield select(makeSelectAddressList());
    const addressListArr = addressList.keySeq().toArray();
    console.log(addressListArr);

    addressListArr.forEach((addr) => {
      console.log(addr);
      const balance = web3.eth.getBalance(addr);
      console.log(balance);

    });

    /*
    for (let i; i < 10; i++){
      yield put(changeBalance(addr, balance));
    }*/


    yield put(checkBalancesSuccess());
  } catch (err) {
    const errorString = 'checkBalances error - ' + err.message;
    yield put(CheckBalancesError(errorString));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_NETWORK, loadNetwork);
  yield takeLatest(CHECK_BALANCES, checkBalances);
}
