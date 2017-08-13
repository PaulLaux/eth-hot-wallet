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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isRestoringWallet: false,

  isComfirmed: false, // if true then we have a valid keystore

  password: false,
  seed: false,

  loading: false,
  error: false,

  keystore: false,
  addresses: false,
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
        .set('password', action.password);
    case INIT_SEED_ERROR:
      return state
        .set('loading', false)
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
        .set('addresses', action.keystore.getAddresses());
    case GENERATE_KEYSTORE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);

    default:
      return state;
  }
}

export default homeReducer;
