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
  INIT_WALLET,
  INIT_WALLET_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isInitialized: false,
  isComfirmed: false,
  password: false,
  seed: false,
  adresses: [],

  loading: false,
  error: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_WALLET:
      return state
        .set('loading', true)
        .set('error', false)
        // .set('seed', null)
        // .set('password', null)
        // .set('adresses', [])
        ;
    case INIT_WALLET_SUCCESS:
      return state
        .set('loading', false)
        .set('seed', action.seed)
        .set('password', action.password);

    default:
      return state;
  }
}

export default homeReducer;
