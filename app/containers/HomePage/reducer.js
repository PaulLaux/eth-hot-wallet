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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isInitialized: false,
  isComfirmed: false,
  password: null,
  seed: null,
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
        .set('adresses', false);
    default:
      return state;
  }
}

export default homeReducer;
