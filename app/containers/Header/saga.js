import { take, call, put, select, takeLatest } from 'redux-saga/effects';
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

/*
function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
  return new Promise((resolve, reject) => {
    ks.keyFromPassword(param, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}*/

function timer() {
  return new Promise((resolve) => setTimeout(_ => resolve('theValue'), 2000));
}


/**
 * Create new seed and password
 */
export function* loadNetwork(action) {
  try {
    console.log('loadNetwork saga, networkName:' + action.networkName);
    console.log(Network);

    const value = yield call(timer);
    console.log('timer');
    yield put(loadNetworkSuccess(1));
  } catch (err) {
    yield put(loadNetworkError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_NETWORK, loadNetwork);
}
