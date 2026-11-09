/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 */
import { createReducer } from '@reduxjs/toolkit';

import {
  GENERATE_WALLET,
  GENERATE_WALLET_SUCCESS,
  GENERATE_WALLET_ERROR,
  GENERATE_WALLET_CANCEL,

  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR,
  SHOW_RESTORE_WALLET,
  RESTORE_WALLET_CANCEL,
  CHANGE_USER_SEED,
  CHANGE_USER_PASSWORD,
  RESTORE_WALLET_FROM_SEED,
  RESTORE_WALLET_FROM_SEED_ERROR,
  RESTORE_WALLET_FROM_SEED_SUCCESS,

  CHANGE_BALANCE,

  SHOW_SEND_TOKEN,
  HIDE_SEND_TOKEN,
  SHOW_TOKEN_CHOOSER,
  HIDE_TOKEN_CHOOSER,

  UPDATE_TOKEN_INFO,

  GENERATE_ADDRESS,
  GENERATE_ADDRESS_SUCCESS,
  GENERATE_ADDRESS_ERROR,

  LOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,

  SET_EXCHANGE_RATES,
  SELECT_CURRENCY,

  CLOSE_WALLET,

  CHECK_LOCAL_STORAGE,
  LOCAL_STORAGE_EXIST,
  LOCAL_STORAGE_NOT_EXIST,

  SAVE_WALLET,
  SAVE_WALLET_SUCCESS,
  SAVE_WALLET_ERROR,

  LOAD_WALLET,
  LOAD_WALLET_SUCCESS,
  LOAD_WALLET_ERROR,
} from './constants';

// The initial state of the App
const initialState = {
  isShowGenerateWallet: false,
  generateWalletLoading: false,  // generate new seed and password
  generateWalletError: false,
  password: false,
  seed: false,

  generateKeystoreLoading: false,
  generateKeystoreError: false,  // if error - no addressList displayed

  isShowRestoreWallet: false,
  userSeed: '',
  userPassword: '',
  restoreWalletError: false,

  isComfirmed: false, // if true then we have a valid keystore

  keystore: false,
  addressList: false,

  /*
  addressList: {
    address1: {
        order: 1
        eth: {balance: weiString / false},
        eos: {balance: weiString / false},
        ppt: {balance: weiString / false},
      }
  } */

  exchangeRates: {},
  convertTo: 'eth_usd',

  addressListLoading: false, // for addressList loading and error
  addressListError: false,
  addressListMsg: false,

  isShowSendToken: false,
  isShowTokenChooser: false,

  saveWalletLoading: false,
  saveWalletError: false,
  loadWalletLoading: false,
  loadWalletError: false,

  // default tokens - must exist on defaultNetwork (see TokenChooser/token-lists.js)
  tokenInfo: {
    eth: {
      name: 'Ethereum',
      contractAddress: null,
      decimals: 18,
    },
    usdc: {
      name: 'USD Coin (Sepolia)',
      contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      decimals: 6,
    },
    link: {
      name: 'Chainlink (Sepolia)',
      contractAddress: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      decimals: 18,
    },
  },
};

export default createReducer(initialState, (builder) => builder
  .addCase(GENERATE_WALLET, (s) => {
    Object.assign(s, { isShowGenerateWallet: true, generateWalletLoading: true, generateWalletError: false });
  })
  .addCase(GENERATE_WALLET_SUCCESS, (s, a) => {
    Object.assign(s, { generateWalletLoading: false, seed: a.seed, password: a.password });
  })
  .addCase(GENERATE_WALLET_ERROR, (s, a) => {
    Object.assign(s, { generateWalletLoading: false, generateWalletError: a.error });
  })
  .addCase(GENERATE_WALLET_CANCEL, (s) => {
    Object.assign(s, { isShowGenerateWallet: false, generateWalletLoading: true, generateWalletError: false, password: false, seed: false });
  })

  .addCase(GENERATE_KEYSTORE, (s) => {
    Object.assign(s, { isShowGenerateWallet: false, generateKeystoreLoading: true, generateKeystoreError: false });
  })
  .addCase(GENERATE_KEYSTORE_SUCCESS, (s, a) => {
    Object.assign(s, {
      keystore: a.keystore,
      seed: false,
      isComfirmed: true,
      addressListError: false,
      addressList: a.addressMap,
      generateKeystoreLoading: false,
    });
  })
  .addCase(GENERATE_KEYSTORE_ERROR, (s, a) => {
    Object.assign(s, { generateKeystoreLoading: false, generateKeystoreError: a.error, isComfirmed: false });
  })

  .addCase(SHOW_RESTORE_WALLET, (s) => {
    Object.assign(s, { isShowRestoreWallet: true, seed: false, userSeed: '' });
  })
  .addCase(RESTORE_WALLET_CANCEL, (s) => {
    Object.assign(s, { isShowRestoreWallet: false, userPassword: '', userSeed: '', restoreWalletError: false });
  })
  .addCase(CHANGE_USER_SEED, (s, a) => { s.userSeed = a.userSeed; })
  .addCase(CHANGE_USER_PASSWORD, (s, a) => { s.userPassword = a.password; })
  .addCase(RESTORE_WALLET_FROM_SEED, (s) => {
    Object.assign(s, { restoreWalletError: false, isComfirmed: false });
  })
  .addCase(RESTORE_WALLET_FROM_SEED_ERROR, (s, a) => { s.restoreWalletError = a.error; })
  .addCase(RESTORE_WALLET_FROM_SEED_SUCCESS, (s, a) => {
    Object.assign(s, { isShowRestoreWallet: false, seed: a.userSeed, password: a.userPassword, userSeed: '', userPassword: '' });
  })

  .addCase(CHANGE_BALANCE, (s, a) => {
    // ignore balances that arrive after the address or token was removed
    const token = s.addressList && s.addressList[a.address] && s.addressList[a.address][a.symbol];
    if (token) token.balance = a.balance;
  })

  .addCase(SHOW_SEND_TOKEN, (s) => { s.isShowSendToken = true; })
  .addCase(HIDE_SEND_TOKEN, (s) => { s.isShowSendToken = false; })
  .addCase(SHOW_TOKEN_CHOOSER, (s) => { s.isShowTokenChooser = true; })
  .addCase(HIDE_TOKEN_CHOOSER, (s) => { s.isShowTokenChooser = false; })

  .addCase(UPDATE_TOKEN_INFO, (s, a) => {
    Object.assign(s, { isShowTokenChooser: false, addressListError: false, tokenInfo: a.tokenInfo, addressList: a.addressMap });
  })

  .addCase(GENERATE_ADDRESS, (s) => {
    Object.assign(s, { addressListLoading: true, addressListError: false, addressListMsg: false });
  })
  .addCase(GENERATE_ADDRESS_SUCCESS, (s, a) => {
    Object.assign(s, {
      addressListLoading: false,
      addressListError: false,
      addressListMsg: 'New address generated succesfully',
      keystore: a.keystore,
    });
    s.addressList[a.newAddress] = a.tokenMap;
  })
  .addCase(GENERATE_ADDRESS_ERROR, (s, a) => {
    Object.assign(s, { addressListLoading: false, addressListError: a.error });
  })

  .addCase(LOCK_WALLET, (s) => { s.password = false; })
  .addCase(UNLOCK_WALLET_SUCCESS, (s, a) => { s.password = a.password; })

  .addCase(SET_EXCHANGE_RATES, (s, a) => { s.exchangeRates = a.rates; })
  .addCase(SELECT_CURRENCY, (s, a) => { s.convertTo = a.convertTo; })

  .addCase(CLOSE_WALLET, () => initialState)

  .addCase(CHECK_LOCAL_STORAGE, (s) => { s.checkLocalStorageLoading = true; })
  .addCase(LOCAL_STORAGE_EXIST, (s) => {
    Object.assign(s, { checkLocalStorageLoading: false, isLocalStorageWallet: true });
  })
  .addCase(LOCAL_STORAGE_NOT_EXIST, (s) => {
    Object.assign(s, { checkLocalStorageLoading: false, isLocalStorageWallet: false });
  })

  .addCase(SAVE_WALLET, (s) => {
    Object.assign(s, { saveWalletLoading: true, saveWalletError: false });
  })
  .addCase(SAVE_WALLET_SUCCESS, (s) => { s.saveWalletLoading = false; })
  .addCase(SAVE_WALLET_ERROR, (s, a) => {
    Object.assign(s, { saveWalletLoading: false, saveWalletError: a.error });
  })

  .addCase(LOAD_WALLET, (s) => {
    Object.assign(s, { loadWalletLoading: true, loadWalletError: false });
  })
  .addCase(LOAD_WALLET_SUCCESS, (s) => { s.loadWalletLoading = false; })
  .addCase(LOAD_WALLET_ERROR, (s, a) => {
    Object.assign(s, { loadWalletLoading: false, loadWalletError: a.error });
  }));
