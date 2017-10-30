/**
 * Wallet operations
 */
import lightwallet from 'eth-lightwallet';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { GENERATE_WALLET, INIT_SEED, GENERATE_KEYSTORE, RESTORE_WALLET_FROM_SEED, GENERATE_ADDRESS, UNLOCK_WALLET } from 'containers/HomePage/constants';

import { makeSelectPassword, makeSelectSeed, makeSelectUserSeed, makeSelectKeystore } from 'containers/HomePage/selectors';

import { loadNetwork } from 'containers/Header/actions';

import generateString from 'utils/crypto';
import { generatedPasswordLength, hdPathString } from 'utils/constants';

import {
  generateWalletSucces,
  generateWalletError,
  seedInitilized,
  initSeedError,
  generateKeystoreSuccess,
  generateKeystoreError,
  restoreWalletFromSeedError,
  generateAddressSuccess,
  generateAddressError,
  unlockWalletSuccess,
  unlockWalletError,
} from './actions';

/* Turn callback into promise to use inside saga
function promisify(func, param) {
  return new Promise((resolve, reject) => {
    func(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });
} */

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
export function* generateWallet() {
  try {
    const password = generateString(generatedPasswordLength);
    const extraEntropy = generateString(generatedPasswordLength);
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy);

    yield put(generateWalletSucces(seed, password));
  } catch (err) {
    yield put(generateWalletError(err));
  }
}

/**
 * Create new seed and password
 */
/*
export function* initSeed() {
  try {
    const password = generateString(generatedPasswordLength);
    const extraEntropy = generateString(generatedPasswordLength);
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy);

    yield put(seedInitilized(seed, password));
  } catch (err) {
    yield put(initSeedError(err));
  }
} */

/**
 * check seed given by user
 */
export function* restoreFromSeed() {
  try {
    const password = generateString(generatedPasswordLength);
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
    const seedPhrase = yield select(makeSelectSeed());
    const opt = {
      password,
      seedPhrase,
      hdPathString,  // The light-wallet default is `m/0'/0'/0'`.
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

    ks.passwordProvider = (callback) => {
      // const password = yield select(makeSelectPassword());
      const pw = prompt('Please enter keystore password', 'Password');
      callback(null, pw);
    };

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 2);

    yield put(generateKeystoreSuccess(ks));
    yield put(loadNetwork('Local RPC'));
  } catch (err) {
    const errorString = `genKeystore error - ${err}`;
    yield put(generateKeystoreError(errorString));
  }
}


/**
 * Generate new address from same key
 * will run on GENERATE_ADDRESS action
 */
export function* generateAddress() {
  try {
    const ks = yield select(makeSelectKeystore());
    if (!ks) {
      throw new Error('no keystore found');
    }

    const password = yield select(makeSelectPassword());
    if (!password) {
      // TODO: Handle password
      throw Error('Wallet Locked');
    }

    /* ks.passwordProvider = (callback) => {
      const pw = prompt('Please enter password1112', 'Password');
      callback(null, pw);
    }; */

    // TODO: remove duplicate
    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }
    // this.ksData[hdPathString].addresses.push(address);

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 1);

    // get last address
    const newAddress = ks.getAddresses().slice(-1)[0];
    yield put(generateAddressSuccess(newAddress));
  } catch (err) {
    const errorString = `generateAddress error - ${err}`;
    console.log(errorString);
    yield put(generateAddressError(errorString));
  }
}

// `keystore.isDerivedKeyCorrect(pwDerivedKey)`
/* ks.passwordProvider = function (callback) {
  const pw = prompt('Please enter password1111', 'Password');
  callback(null, pw);
}; */

/**
 * Create new keystore and generate some addreses
 */
export function* unlockWallet() {
  try {
    const currentPassword = yield select(makeSelectPassword());
    if (currentPassword) {
      throw Error('Wallet Already unlocked');
    }

    const ks = yield select(makeSelectKeystore());
    if (!ks) {
      throw new Error('No keystore found');
    }

    const passwordProvider = ks.passwordProvider;

    function passwordProviderPromise() { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        passwordProvider((err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const userPassword = yield call(passwordProviderPromise);

    if (!userPassword) {
      throw Error('No password entered');
    }

    const pwDerivedKey = yield call(keyFromPasswordPromise, userPassword);
    // TODO: Move into password provider?
    const isPasswordCorrect = ks.isDerivedKeyCorrect(pwDerivedKey);

    if (!isPasswordCorrect) {
      throw Error('Invalid Password');
    }

    yield put(unlockWalletSuccess(userPassword));
  } catch (err) {
    const errorString = `unlockWallet ${err}`;
    yield put(unlockWalletError(errorString));
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

  // yield takeLatest(INIT_SEED, initSeed);
  yield takeLatest(GENERATE_WALLET, generateWallet);
  yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  yield takeLatest(GENERATE_ADDRESS, generateAddress);
  yield takeLatest(RESTORE_WALLET_FROM_SEED, restoreFromSeed);
  yield takeLatest(UNLOCK_WALLET, unlockWallet);

  /*
  while (yield takeLatest(INIT_WALLET, initSeed)) {
    // yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  }*/
}
