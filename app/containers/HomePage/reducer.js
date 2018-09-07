/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

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
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
  UNLOCK_WALLET_ERROR,

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
const initialState = fromJS({
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
        eth: {balance: bigNumber},
        eos: {balance: bigNumber},
        ppt: {balance: bigNumber},
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

  tokenInfo: {
    eth: {
      name: 'Ethereum',
      contractAddress: null,
      decimals: 18,
    },
    omg: {
      name: 'OmiseGo',
      contractAddress: '0xbcad569fe454e78ca90e4120d89b6b69f8db402f',
      decimals: 18,
    },
    bat: {
      name: 'Basic Attention Token',
      contractAddress: '0xf3a1c162bc4a82ca5227d7c542c20dd087d2c37b',
      decimals: 18,
    },
    mkr: {
      symbol: 'mkr',
      name: 'Maker',
      contractAddress: '0xece9fa304cc965b00afc186f5d0281a00d3dbbfd',
      decimals: 18,
    },
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {

    case GENERATE_WALLET:
      return state
        .set('isShowGenerateWallet', true)
        .set('generateWalletLoading', true)
        .set('generateWalletError', false);
    case GENERATE_WALLET_SUCCESS:
      return state
        .set('generateWalletLoading', false)
        .set('seed', action.seed)
        .set('password', action.password);
    case GENERATE_WALLET_ERROR:
      return state
        .set('generateWalletLoading', false)
        .set('generateWalletError', action.error);
    case GENERATE_WALLET_CANCEL:
      return state
        .set('isShowGenerateWallet', false)
        .set('generateWalletLoading', true)
        .set('generateWalletError', false)
        .set('password', false)
        .set('seed', false);

    case GENERATE_KEYSTORE:
      return state
        .set('isShowGenerateWallet', false)
        .set('generateKeystoreLoading', true)
        .set('generateKeystoreError', false);
    case GENERATE_KEYSTORE_SUCCESS:
      return state
        .set('keystore', action.keystore)
        .set('seed', false)
        .set('isComfirmed', true)
        .set('addressListError', false)
        .set('addressList', fromJS(action.addressMap))
        .set('generateKeystoreLoading', false);
    case GENERATE_KEYSTORE_ERROR:
      return state
        .set('generateKeystoreLoading', false)
        .set('generateKeystoreError', action.error)
        .set('isComfirmed', false);

    case SHOW_RESTORE_WALLET:
      return state
        .set('isShowRestoreWallet', true)
        .set('seed', false)
        .set('userSeed', '');
    case RESTORE_WALLET_CANCEL:
      return state
        .set('isShowRestoreWallet', false)
        .set('userPassword', '')
        .set('userSeed', '')
        .set('restoreWalletError', false);
    case CHANGE_USER_SEED:
      return state
        .set('userSeed', action.userSeed); // Delete prefixed space from user seed
    case CHANGE_USER_PASSWORD:
      return state
        .set('userPassword', action.password);
    case RESTORE_WALLET_FROM_SEED:
      return state
        .set('restoreWalletError', false)
        .set('isComfirmed', false);
    case RESTORE_WALLET_FROM_SEED_ERROR:
      return state
        .set('restoreWalletError', action.error);
    case RESTORE_WALLET_FROM_SEED_SUCCESS:
      return state
        .set('isShowRestoreWallet', false)
        .set('seed', action.userSeed)
        .set('password', action.userPassword)
        .set('userSeed', '')
        .set('userPassword', '');


    case CHANGE_BALANCE:
      return state
        .setIn(['addressList', action.address, action.symbol, 'balance'], action.balance);

    case SHOW_SEND_TOKEN:
      return state
        .set('isShowSendToken', true);
    case HIDE_SEND_TOKEN:
      return state
        .set('isShowSendToken', false);

    case SHOW_TOKEN_CHOOSER:
      return state
        .set('isShowTokenChooser', true);
    case HIDE_TOKEN_CHOOSER:
      return state
        .set('isShowTokenChooser', false);

    case UPDATE_TOKEN_INFO:
      return state
        .set('isShowTokenChooser', false)
        .set('addressListError', false)
        .set('tokenInfo', fromJS(action.tokenInfo))
        .set('addressList', fromJS(action.addressMap));

    case GENERATE_ADDRESS:
      return state
        .set('addressListLoading', true)
        .set('addressListError', false)
        .set('addressListMsg', false);
    case GENERATE_ADDRESS_SUCCESS:
      return state
        .set('addressListLoading', false)
        .set('addressListError', false)
        .set('addressListMsg', 'New address generated succesfully')
        .setIn(['addressList', action.newAddress], fromJS(action.tokenMap));
    case GENERATE_ADDRESS_ERROR:
      return state
        .set('addressListLoading', false)
        .set('addressListError', action.error);


    case LOCK_WALLET:
      return state
        .set('password', false);
    case UNLOCK_WALLET:
      return state;
    case UNLOCK_WALLET_SUCCESS:
      return state
        .set('password', action.password);
    case UNLOCK_WALLET_ERROR:
      return state;


    case SET_EXCHANGE_RATES:
      return state
        .set('exchangeRates', fromJS(action.rates));
    case SELECT_CURRENCY:
      return state
        .set('convertTo', fromJS(action.convertTo));

    case CLOSE_WALLET:
      return initialState;

    case CHECK_LOCAL_STORAGE:
      return state
        .set('checkLocalStorageLoading', true);
    case LOCAL_STORAGE_EXIST:
      return state
        .set('checkLocalStorageLoading', false)
        .set('isLocalStorageWallet', true);
    case LOCAL_STORAGE_NOT_EXIST:
      return state
        .set('checkLocalStorageLoading', false)
        .set('isLocalStorageWallet', false);

    case SAVE_WALLET:
      return state
        .set('saveWalletLoading', true)
        .set('saveWalletError', false);
    case SAVE_WALLET_SUCCESS:
      return state
        .set('saveWalletLoading', false);
    case SAVE_WALLET_ERROR:
      return state
        .set('saveWalletLoading', false)
        .set('saveWalletError', action.error);

    case LOAD_WALLET:
      return state
        .set('loadWalletLoading', true)
        .set('loadWalletError', false);
    case LOAD_WALLET_SUCCESS:
      return state
        .set('loadWalletLoading', false);
    case LOAD_WALLET_ERROR:
      return state
        .set('loadWalletLoading', false)
        .set('loadWalletError', action.error);

    default:
      return state;
  }
}
/*
  LOCK_WALLET,
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
  UNLOCK_WALLET_ERROR,
*/

export default homeReducer;
