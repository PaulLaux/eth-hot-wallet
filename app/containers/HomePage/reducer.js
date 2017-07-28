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
  CREATE_WALLET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isInitialized: false,
  isUnlocked: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_WALLET:

      // Delete prefixed '@' from the github username
      return state
        .set('isInitialized', true);
    default:
      return state;
  }
}

export default homeReducer;
