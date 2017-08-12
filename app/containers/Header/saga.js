import Web3 from 'web3';
import HookedWeb3Provider from 'vendor/hooked-web3-provider/hooked-web3-provider';

import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectKeystore } from 'containers/HomePage/selectors';
import {
  // loadNetwork,
  loadNetworkSuccess,
  loadNetworkError,
} from './actions';

import {
  LOAD_NETWORK,
  // LOAD_NETWORK_SUCCESS,
  // LOAD_NETWORK_ERROR,
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
    const keystore = yield select(makeSelectKeystore());

    if (keystore) {
      const web3Provider = new HookedWeb3Provider({
        host: rpcAddress,
        transaction_signer: keystore,
      });
      web3.setProvider(web3Provider);
      const blockNumber = web3.eth.blockNumber;
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

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_NETWORK, loadNetwork);
}
