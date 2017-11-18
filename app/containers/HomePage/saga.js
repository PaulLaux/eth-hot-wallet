/**
 * Wallet operations
 */
import lightwallet from 'eth-lightwallet';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  GENERATE_WALLET,
  GENERATE_KEYSTORE,
  RESTORE_WALLET_FROM_SEED,
  GENERATE_ADDRESS,
  UNLOCK_WALLET,
  CLOSE_WALLET,
  SHOW_SEND_TOKEN,
} from 'containers/HomePage/constants';

import {
  makeSelectPassword,
  makeSelectSeed,
  makeSelectUserSeed,
  makeSelectUserPassword,
  makeSelectKeystore,
} from 'containers/HomePage/selectors';

import { loadNetwork } from 'containers/Header/actions';

import { changeFrom } from 'containers/SendToken/actions';

import generateString from 'utils/crypto';

import { generatedPasswordLength, hdPathString, offlineModeString, defaultNetwork } from 'utils/constants';

import { timer } from 'utils/common';

import {
  generateWalletSucces,
  generateWalletError,
  generateKeystoreSuccess,
  generateKeystoreError,
  changeUserSeed,
  generateKeystore,
  restoreWalletFromSeedError,
  restoreWalletFromSeedSuccess,
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

/**
 * Create new seed and password
 */
export function* generateWallet() {
  try {
    const password = generateString(generatedPasswordLength);
    const extraEntropy = generateString(generatedPasswordLength);
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy);

    yield call(timer, 500);

    yield put(generateWalletSucces(seed, password));
  } catch (err) {
    yield put(generateWalletError(err));
  }
}


/**
 * check seed given by user
 */
export function* restoreFromSeed() {
  try {
    const userPassword = yield select(makeSelectUserPassword());
    let userSeed = yield select(makeSelectUserSeed());

    // remove trailing spaces if needed
    yield put(changeUserSeed(userSeed.replace(/^\s+|\s+$/g, '')));
    userSeed = yield select(makeSelectUserSeed());

    if (!lightwallet.keystore.isSeedValid(userSeed)) {
      yield put(restoreWalletFromSeedError('Invalid seed'));
      return;
    }

    if (userPassword.length < 8) {
      yield put(restoreWalletFromSeedError('Password length must be 8 characters at least'));
      return;
    }

    yield put(restoreWalletFromSeedSuccess(userSeed, userPassword));
    yield put(generateKeystore());
  } catch (err) {
    yield put(restoreWalletFromSeedError(err));
  }
}

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

    // allow time to render components before cpu intensive tasks:
    yield call(timer, 300);

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
    yield put(loadNetwork(defaultNetwork));
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
      throw new Error('No keystore found');
    }

    const password = yield select(makeSelectPassword());
    if (!password) {
      // TODO: Handle password
      throw Error('Wallet Locked');
    }

    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 1);

    // get last address
    const newAddress = ks.getAddresses().slice(-1)[0];
    const index = ks.getAddresses().length; // serial index for sorting by generation order;
    yield put(generateAddressSuccess(newAddress, index));
  } catch (err) {
    yield put(generateAddressError(err.message));
  }
}

/**
 * unlock wallet using user given password
 */
export function* unlockWallet() {
  try {
    const currentPassword = yield select(makeSelectPassword());
    if (currentPassword) {
      throw Error('Wallet Already unlocked');
    }

    const ks = yield select(makeSelectKeystore());
    if (!ks) {
      throw new Error('No keystore to unlock');
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
    const errorString = `Unlock wallet error - ${err.message}`;
    yield put(unlockWalletError(errorString));
  }
}

/**
 * change source address when opening send modal
 */
export function* changeSourceAddress(action) {
  if (action.address) {
    yield put(changeFrom(action.address));
  }
}

/**
 * Disconnect from network during closeWallet
 */
export function* closeWallet() {
  yield put(loadNetwork(offlineModeString));
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
  yield takeLatest(SHOW_SEND_TOKEN, changeSourceAddress);
  yield takeLatest(CLOSE_WALLET, closeWallet);
  /*
  while (yield takeLatest(INIT_WALLET, initSeed)) {
    // yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  } */
}
