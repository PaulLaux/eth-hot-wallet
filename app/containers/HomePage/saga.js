/**
 * Wallet operations
 */
import { call, put, race, select, take, takeLatest } from 'redux-saga/effects';

import {
  GENERATE_WALLET,
  GENERATE_KEYSTORE,
  RESTORE_WALLET_FROM_SEED,
  GENERATE_ADDRESS,
  LOCK_WALLET,
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
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
import askPassword from 'utils/askPassword';
import { newMnemonic, isMnemonicValid, createVault, openVault, addAddress } from 'utils/wallet';

import { generatedPasswordLength, offlineModeString, defaultNetwork, localStorageKey, autoLockTime } from 'utils/constants';

import { timer } from 'utils/common';

import { getEthBalance } from 'containers/Header/saga';

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
  lockWallet,
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
    const seed = newMnemonic();

    yield call(timer, 500);

    yield put(generateWalletSucces(seed, password));
  } catch (err) {
    yield put(generateWalletError(err.message));
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

    if (!isMnemonicValid(userSeed)) {
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
    yield put(restoreWalletFromSeedError(err.message));
  }
}

/**
 * Create new keystore with the first address
 */
export function* genKeystore() {
  try {
    const password = yield select(makeSelectPassword());
    const seedPhrase = yield select(makeSelectSeed());
    // allow time to render components before cpu intensive tasks:
    yield call(timer, 300);

    const ks = yield call(createVault, seedPhrase, password);
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
      throw new Error('Wallet Locked');
    }

    const newKs = addAddress(ks, yield call(openVault, ks, password));
    const newAddress = newKs.addresses.slice(-1)[0];
    const index = newKs.addresses.length; // serial index for sorting by generation order;
    const tokenList = yield select(makeSelectTokenInfoList());
    yield put(generateAddressSuccess(newKs, newAddress, index, tokenList));
    yield put(saveWallet());

    // balance checking for new address (will be aborted in offline mode)
    try {
      const balance = yield call(getEthBalance, newAddress);
      yield put(changeBalance(newAddress, 'eth', balance));
    } catch { /* offline */ }
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

    const userPassword = yield call(askPassword);
    if (!userPassword) {
      throw Error('No password entered');
    }

    yield call(openVault, ks, userPassword);
    yield put(unlockWalletSuccess(userPassword));
  } catch (err) {
    const errorString = `Unlock wallet error - ${err.message}`;
    yield put(unlockWalletError(errorString));
  }
}

/**
 * Lock the wallet after autoLockTime unless it is locked or closed before
 */
export function* autoLock() {
  const { timeout } = yield race({ timeout: call(timer, autoLockTime), locked: take([LOCK_WALLET, CLOSE_WALLET]) });
  if (timeout) {
    yield put(lockWallet());
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

    localStorage.setItem(localStorageKey, JSON.stringify(ks));

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

    const ks = JSON.parse(localStorage.getItem(localStorageKey));
    if (!ks) {
      throw new Error('No keystore found in localStorage');
    }

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
  try {
    localStorage.clear();
  } catch { /* storage blocked by the browser: nothing was saved */ }
}

/**
 * Saga triggered by TokenChooser container to pass tokenInfo for selected tokens
 * @param {object} action dispatched by tokenChooser
 * @param {object} action.tokenInfo
 */
export function* chosenTokenInfo(action) {
  const addressList = (yield select(makeSelectKeystore())).addresses;
  yield put(updateTokenInfo(addressList, action.tokenInfo));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  // Watches for INIT_WALLET actions and calls initKS when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution

  yield takeLatest(GENERATE_WALLET, generateWallet);
  yield takeLatest(GENERATE_KEYSTORE, genKeystore);
  yield takeLatest(GENERATE_ADDRESS, generateAddress);
  yield takeLatest(RESTORE_WALLET_FROM_SEED, restoreFromSeed);
  yield takeLatest(UNLOCK_WALLET, unlockWallet);
  // a new or restored wallet starts unlocked
  yield takeLatest([UNLOCK_WALLET_SUCCESS, GENERATE_KEYSTORE], autoLock);
  yield takeLatest(SHOW_SEND_TOKEN, changeSourceAddress);
  yield takeLatest(CLOSE_WALLET, closeWallet);

  yield takeLatest(SAVE_WALLET, saveWalletS);
  yield takeLatest(LOAD_WALLET, loadWalletS);

  yield takeLatest(CONFIRM_UPDATE_TOKEN_INFO, chosenTokenInfo);
}
