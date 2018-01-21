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
  CHANGE_GAS_PRICE,

  COMFIRM_SEND_TRANSACTION,
  COMFIRM_SEND_TRANSACTION_SUCCESS,
  COMFIRM_SEND_TRANSACTION_ERROR,

  ABORT_TRANSACTION,
  SEND_TRANSACTION,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,

} from './constants';


const initialState = fromJS({
  from: '',
  to: '',
  amount: 0,
  gasPrice: 10, // gwei
  locked: false,
  sendTokenSymbol: 'eth',

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
      // update values only if provided:
      return state
        .update('from', (fromValue) => action.address || fromValue)
        .update('sendTokenSymbol', (sendTokenSymbolValue) => action.sendTokenSymbol || sendTokenSymbolValue);
    case CHANGE_AMOUNT:
      return state
        .set('amount', action.amount);

    case CHANGE_TO:
      return state
        .set('to', action.address);

    case CHANGE_GAS_PRICE:
      return state
        .set('gasPrice', action.gasPrice);

    case COMFIRM_SEND_TRANSACTION:
      return state
        .set('comfirmationLoading', true)
        .set('locked', true);
    case COMFIRM_SEND_TRANSACTION_SUCCESS:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', action.msg)
        .set('confirmationError', false);
    case COMFIRM_SEND_TRANSACTION_ERROR:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationError', action.error)
        .set('locked', false);
    case ABORT_TRANSACTION:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', false)
        .set('confirmationError', false)
        .set('locked', false)
        .set('sendError', false)
        .set('sendTx', false);

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
