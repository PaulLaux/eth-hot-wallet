/*
 *
 * TokenChooser reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_TOKEN,
} from './constants';

const initialState = fromJS({

  chosenTokens: { mero: true },

});

function tokenChooserReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TOKEN:
      return state.setIn(['chosenTokens', action.symbol], action.toggle);
    default:
      return state;
  }
}

export default tokenChooserReducer;
