/**
 * Wallet operations
 */

import lightwallet from 'eth-lightwallet';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { INIT_SEED, GENERATE_KEYSTORE, RESTORE_WALLET_FROM_SEED } from 'containers/HomePage/constants';

import generateString from 'utils/crypto';

import { makeSelectPassword, makeSelectSeed, makeSelectUserSeed } from 'containers/HomePage/selectors';

import { loadNetwork } from 'containers/Header/actions';

import {
  seedInitilized,
  initSeedError,
  generateKeystoreSuccess,
  generateKeystoreError,
  restoreWalletFromSeedError,
} from './actions';

const PasswordLength = 12;

/* Turn callback into promise to use inside saga

function promisify(func, param) {
  return new Promise((resolve, reject) => {
    func(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });
}*/


/* keyStore.createVault({password: password,
    seedPhrase: '(opt)seed',entropy: '(opt)additional entropy',salt: '(opt)'}, function (err, ks) {}); */
function createVaultPromise(param) {
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault(param, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}

/**
 * Create new seed and password
 */
export function* initSeed() {
  try {
    const password = generateString(PasswordLength);
    const extraEntropy = generateString(PasswordLength);
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy);

    yield put(seedInitilized(seed, password));
  } catch (err) {
    yield put(initSeedError(err));
  }
}

/**
 * check seed given by user
 */
export function* restoreFromSeed() {
  try {
    const password = generateString(PasswordLength);
    const userSeed = yield select(makeSelectUserSeed());

    if (userSeed) {
      if (lightwallet.keystore.isSeedValid(userSeed)) {
        yield put(seedInitilized(userSeed, password));
      } else {
        yield put(initSeedError('restoreFromSeed Error - Seed supplied by user is invalid'));
      }
    } else {
      yield put(initSeedError('restoreFromSeed Error - Please provide seed'));
    }
  } catch (err) {
    yield put(restoreWalletFromSeedError(err));
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

    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
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
    // yield put(loadNetwork('Ropsten_Test_Net'));
    yield put(loadNetwork('Local_RPC'));
  } catch (err) {
    const errorString = 'genKeystore error - ' + err;
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
  yield takeLatest(INIT_SEED, initSeed);
  yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  yield takeLatest(RESTORE_WALLET_FROM_SEED, restoreFromSeed);
  
  /*
  while (yield takeLatest(INIT_WALLET, initSeed)) {
    // yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  }*/
}
