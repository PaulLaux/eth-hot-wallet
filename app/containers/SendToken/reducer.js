/*
 *
 * SendToken reducer
 *
 */
import BigNumber from 'bignumber.js';
import { fromJS } from 'immutable';
import {
  CHANGE_FROM,
  CHANGE_AMOUNT,
  CHANGE_TO,
  CHANGE_GAS_PRICE,

  COMFIRM_SEND_TRANSACTION,
  COMFIRM_SEND_TRANSACTION_SUCCESS,
  COMFIRM_SEND_TRANSACTION_ERROR,

  SEND_TRANSACTION,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,
} from './constants';

const Gwei = '1000000000';

const initialState = fromJS({
  from: '',
  to: '',
  amount: 0,
  gasPrice: new BigNumber(15).times(Gwei),

  comfirmationLoading: false,
  confirmationError: false,
  confirmationMsg: false,

  sendInProgress: false,
  sendError: false,
  sendTx: false,

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

    case CHANGE_GAS_PRICE:
      return state
        .set('gasPrice', new BigNumber(action.gasPrice).times(Gwei));

    case COMFIRM_SEND_TRANSACTION:
      return state
        .set('comfirmationLoading', true);
    case COMFIRM_SEND_TRANSACTION_SUCCESS:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', action.msg);
    case COMFIRM_SEND_TRANSACTION_ERROR:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationError', action.error);

    case SEND_TRANSACTION:
      return state
        .set('sendInProgress', true)
        .set('sendError', false)
        .set('sendTx', false);
    case SEND_TRANSACTION_SUCCESS:
      return state
        .set('sendInProgress', false)
        .set('sendError', false)
        .set('sendTx', action.tx);
    case SEND_TRANSACTION_ERROR:
      return state
        .set('sendInProgress', false)
        .set('sendError', action.error)
        .set('sendTx', false);

    default:
      return state;
  }
}

export default sendTokenReducer;
