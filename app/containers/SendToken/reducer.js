/*
 *
 * SendToken reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_FROM,
  CHANGE_AMOUNT,
  CHANGE_TO,
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

    case CHANGE_AMOUNT:
      return state
        .set('amount', action.amount);

    case CHANGE_TO:
      return state
        .set('to', action.address);

    default:
      return state;
  }
}

export default sendTokenReducer;
