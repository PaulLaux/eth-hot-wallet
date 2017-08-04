/**
 * Wallet operations
 */

import lightwallet from 'eth-lightwallet';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { INIT_WALLET } from 'containers/HomePage/constants';
import { walletInitilized, initWalletError } from 'containers/HomePage/actions';

import generateString from 'utils/crypto';
// import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';


const deriveKeyFromPassword = lightwallet.keystore.deriveKeyFromPassword;

/* Turn callback into promise to use inside saga
*  Todo: turn into general function
*/
function deriveKeyFromPasswordPromise(param) {
  return new Promise((resolve, reject) => {
    deriveKeyFromPassword(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });
}

/*
lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
    console.log(pwDerivedKey);
});*/


/**
 * Github repos request/response handler
 */
export function* initKS() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    const password = generateString(10);
    const pwDerivedKey = yield call(deriveKeyFromPasswordPromise, password);
    console.log('deriveKeyFromPasswordPromise success');

    const extraEntropy = 'fffeefefef1';
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy);


    yield put(walletInitilized(seed, password));
  } catch (err) {
    yield put(initWalletError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  // Watches for INIT_WALLET actions and calls initKS when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(INIT_WALLET, initKS);
}
