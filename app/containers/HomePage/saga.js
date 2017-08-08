/**
 * Wallet operations
 */

import lightwallet from 'eth-lightwallet';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { INIT_WALLET, GENERATE_KEYSTORE } from 'containers/HomePage/constants';

import { walletInitilized, initWalletError, generateKeystoreSuccess, generateKeystoreError } from 'containers/HomePage/actions';

import generateString from 'utils/crypto';

import { makeSelectPassword, makeSelectSeed } from 'containers/HomePage/selectors';

/* Turn callback into promise to use inside saga
*  lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {});
*/

function promisify(func, param) {
  return new Promise((resolve, reject) => {
    func(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });
}


/* keyStore.createVault({password: password,
    seedPhrase: '(opt)seed',entropy: '(opt)additional entropy',salt: '(opt)'}, function (err, ks) {}); */
function createVaultPromise(param) {
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });
}

/**
 * Create new seed and password
 */
export function* initSeed() {
  try {
    const password = generateString(10);
    const extraEntropy = generateString(10);
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy);

    yield put(walletInitilized(seed, password));
  } catch (err) {
    yield put(initWalletError(err));
  }
}

/**
 * Create new keystore and generate some addreses
 */
export function* genKeystore() {
  try {
    const password = yield select(makeSelectPassword());
    const seed = yield select(makeSelectSeed());
    const opt = {
      'password': password,
      'seed': seed,
    };

    const ks = yield call(createVaultPromise, opt);

    function keyFromPasswordPromise(param) {
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);

    ks.generateNewAddress(pwDerivedKey, 2);

    yield put(generateKeystoreSuccess(ks));
  } catch (err) {
    const errorString = 'Generate Keystore error - ' + err;
    yield put(generateKeystoreError(errorString));
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
  yield takeLatest(INIT_WALLET, initSeed);
  yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  /*
  while (yield takeLatest(INIT_WALLET, initSeed)) {
    // yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  }*/
}
