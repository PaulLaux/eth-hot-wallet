/*
 *
 * SendToken reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_FROM,
} from './constants';

const initialState = fromJS({
  from: false,
  to: false,
  amount: 0,
  gasPrice: 50,
});

function sendTokenReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FROM:
      return state
      .set('from', action.address);
    default:
      return state;
  }
}

export default sendTokenReducer;
