/**
 * Wallet operations
 */
import lightwallet from 'eth-lightwallet';
import localStore from 'store/dist/store.modern';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  GENERATE_WALLET,
  GENERATE_KEYSTORE,
  RESTORE_WALLET_FROM_SEED,
  GENERATE_ADDRESS,
  UNLOCK_WALLET,
  CLOSE_WALLET,
  SHOW_SEND_TOKEN,
  SAVE_WALLET,
  LOAD_WALLET,
} from 'containers/HomePage/constants';

import { CONFIRM_UPDATE_TOKEN_INFO } from 'containers/TokenChooser/constants';

import {
  makeSelectPassword,
  makeSelectSeed,
  makeSelectUserSeed,
  makeSelectUserPassword,
  makeSelectKeystore,
  makeSelectTokenInfoList,
} from 'containers/HomePage/selectors';

import { loadNetwork } from 'containers/Header/actions';

import { changeFrom } from 'containers/SendToken/actions';

import generateString from 'utils/crypto';

import { generatedPasswordLength, hdPathString, offlineModeString, defaultNetwork, localStorageKey } from 'utils/constants';

import { timer } from 'utils/common';

import { getEthBalancePromise } from 'containers/Header/saga';

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
  changeBalance,
  unlockWalletSuccess,
  unlockWalletError,
  saveWallet,
  saveWalletSuccess,
  saveWalletError,
  loadWalletSuccess,
  loadWalletError,
  updateTokenInfo,
} from './actions';

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
      hdPathString,
    };
    // allow time to render components before cpu intensive tasks:
    yield call(timer, 300);


    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const ks = yield call(createVaultPromise, opt);

    ks.passwordProvider = (callback) => {
      // const password = yield select(makeSelectPassword());
      const pw = prompt('Please enter keystore password', 'Password'); // eslint-disable-line
      callback(null, pw);
    };

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 1);

    const tokenList = yield select(makeSelectTokenInfoList());

    yield put(generateKeystoreSuccess(ks, tokenList));
    yield put(loadNetwork(defaultNetwork));
    yield put(saveWallet());
  } catch (err) {
    const errorString = `genKeystore error - ${err}`;
    yield put(generateKeystoreError(errorString));
  }
}


/**
 * Generate new address from same key
 * will run after GENERATE_ADDRESS action
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
      throw new Error('Wallet Locked');
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


    const tokenList = yield select(makeSelectTokenInfoList());
    // get last address
    const newAddress = ks.getAddresses().slice(-1)[0];
    const index = ks.getAddresses().length; // serial index for sorting by generation order;
    yield put(generateAddressSuccess(newAddress, index, tokenList));
    yield put(saveWallet());

    // balance checking for new address (will be aborted in offline mode)
    try {
      const balance = yield call(getEthBalancePromise, newAddress);
      yield put(changeBalance(newAddress, 'eth', balance));
    } catch (err) { }  // eslint-disable-line 
  } catch (err) {
    yield call(timer, 1000); // eye candy
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
 * change source address and token when opening send modal
 */
export function* changeSourceAddress(action) {
  // wait for container to load and then change from address
  if (action.address) {
    yield put(changeFrom(action.address, action.sendTokenSymbol));
  }
}

/**
 * Disconnect from network during closeWallet
 */
export function* closeWallet() {
  yield deleteWallet();
  yield put(loadNetwork(offlineModeString));
}

/**
 * Save wallet to localStorage
 */
export function* saveWalletS() {
  try {
    const ks = yield select(makeSelectKeystore());
    if (!ks) {
      throw new Error('No keystore defined');
    }

    const dump = {
      ver: '1',
      saved: new Date().toISOString(),
      ks: ks.serialize(),
    };
    // console.log(`Saving len: ${JSON.stringify(dump).length}`);

    localStore.set(localStorageKey, dump);

    yield put(saveWalletSuccess());
  } catch (err) {
    const errorString = `${err.message}`;
    yield put(saveWalletError(errorString));
  }
}

/**
 * Load wallet from localStorage
 */
export function* loadWalletS() {
  try {
    yield call(timer, 1000);
    const existingKs = yield select(makeSelectKeystore());
    if (existingKs) {
      throw new Error('Existing keystore present  - aborting load form localStorage');
    }

    const dump = localStore.get(localStorageKey);
    if (!dump) {
      throw new Error('No keystore found in localStorage');
    }
    // console.log(`Load len: ${JSON.stringify(dump).length}`);

    const ksDump = dump.ks;
    const ks = lightwallet.keystore.deserialize(ksDump);

    const tokenList = yield select(makeSelectTokenInfoList());
    yield put(generateKeystoreSuccess(ks, tokenList));
    yield put(loadNetwork(defaultNetwork));
    yield put(loadWalletSuccess());
  } catch (err) {
    const errorString = `${err.message}`;
    yield put(loadWalletError(errorString));
  }
}

/**
 * delete all values from localStorage
 */
export function* deleteWallet() {
  localStore.clearAll();
}

/**
 * Saga triggered by TokenChooser container to pass tokenInfo for selected tokens
 * @param {object} action dispatched by tokenChooser
 * @param {object} action.tokenInfo
 */
export function* chosenTokenInfo(action) {
  const addressList = (yield select(makeSelectKeystore())).getAddresses();
  yield put(updateTokenInfo(addressList, action.tokenInfo));
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

  yield takeLatest(SAVE_WALLET, saveWalletS);
  yield takeLatest(LOAD_WALLET, loadWalletS);

  yield takeLatest(CONFIRM_UPDATE_TOKEN_INFO, chosenTokenInfo);
  /*
  while (yield takeLatest(INIT_WALLET, initSeed)) {
    // yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  } */
}
