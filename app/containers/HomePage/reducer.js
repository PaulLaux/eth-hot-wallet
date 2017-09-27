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
  INIT_SEED,
  INIT_SEED_SUCCESS,
  INIT_SEED_ERROR,
  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR,
  SHOW_RESTORE_WALLET,
  CHANGE_USER_SEED,
  RESTORE_WALLET_FROM_SEED,
  RESTORE_WALLET_FROM_SEED_ERROR,

  CHANGE_BALANCE,

  SHOW_SEND_TOKEN,
  HIDE_SEND_TOKEN,

  GENERATE_ADDRESS,
  GENERATE_ADDRESS_SUCCESS,
  GENERATE_ADDRESS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,  // if error - no addressList displayed

  isShowRestoreWallet: false,
  userSeed: '',

  isComfirmed: false, // if true then we have a valid keystore

  password: false,
  seed: false,

  keystore: false,
  addressList: false,

  addressListLoading: false, // for loading and error inside addressList
  addressListError: false,
  addressListMsg: false,

  sendToken: true,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SEED:
      return state
        .set('loading', true)
        .set('error', false)
        .set('isComfirmed', false);
    case INIT_SEED_SUCCESS:
      return state
        .set('loading', false)
        .set('seed', action.seed)
        .set('password', action.password)
        .set('isShowRestoreWallet', false);
    case INIT_SEED_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);

    case SHOW_RESTORE_WALLET:
      return state
        .set('isShowRestoreWallet', true)
        .set('seed', false)
        .set('userSeed', '');
    case CHANGE_USER_SEED:
      return state
        .set('userSeed', action.seed); // Delete prefixed space from user seed

    case RESTORE_WALLET_FROM_SEED:
      return state
        .set('error', false)
        .set('isComfirmed', false);
    case RESTORE_WALLET_FROM_SEED_ERROR:
      return state
        .set('error', action.error);

    case GENERATE_KEYSTORE:
      return state
        .set('loading', true)
        .set('error', false);
    case GENERATE_KEYSTORE_SUCCESS:
      return state
        .set('loading', false)
        .set('keystore', action.keystore)
        .set('seed', false)
        .set('isComfirmed', true)
        // .set('addressList', action.addressList);
        .set('addressList', fromJS(action.addressList));
    case GENERATE_KEYSTORE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);

    case CHANGE_BALANCE:
      return state
        .setIn(['addressList', action.address, 'balance'], action.balance);

    case SHOW_SEND_TOKEN:
      return state
        .set('sendToken', true);
    case HIDE_SEND_TOKEN:
      return state
        .set('sendToken', false);


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
        // Add new address as key and set balance as false ('n/a')
        .setIn(['addressList', action.newAddress, 'balance'], false);
    case GENERATE_ADDRESS_ERROR:
      return state
        .set('addressListLoading', false)
        .set('addressListError', action.error);

    default:
      return state;
  }
}


export default homeReducer;
