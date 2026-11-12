/*
 *
 * SendToken reducer
 *
 */
import { createReducer } from '@reduxjs/toolkit';
import {
  CHANGE_FROM,
  CHANGE_AMOUNT,
  CHANGE_TO,

  COMFIRM_SEND_TRANSACTION,
  COMFIRM_SEND_TRANSACTION_SUCCESS,
  COMFIRM_SEND_TRANSACTION_ERROR,

  ABORT_TRANSACTION,
  SEND_TRANSACTION,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,

} from './constants';


const initialState = {
  from: '',
  to: '',
  amount: 0,
  locked: false,
  sendTokenSymbol: 'eth',

  comfirmationLoading: false,
  confirmationError: false,
  confirmationMsg: false,
  fee: false, // confirmed gas and fee caps as decimal strings: { gas, maxFeePerGas, maxPriorityFeePerGas }

  sendInProgress: false,
  sendError: false,
  sendTx: false,

};

export default createReducer(initialState, (builder) => builder
  .addCase(CHANGE_FROM, (s, a) => {
    // update values only if provided:
    s.from = a.address || s.from;
    s.sendTokenSymbol = a.sendTokenSymbol || s.sendTokenSymbol;
  })
  .addCase(CHANGE_AMOUNT, (s, a) => { s.amount = a.amount; })
  .addCase(CHANGE_TO, (s, a) => { s.to = a.address; })

  .addCase(COMFIRM_SEND_TRANSACTION, (s) => {
    Object.assign(s, { comfirmationLoading: true, locked: true });
  })
  .addCase(COMFIRM_SEND_TRANSACTION_SUCCESS, (s, a) => {
    Object.assign(s, { comfirmationLoading: false, confirmationMsg: a.msg, fee: a.fee, confirmationError: false });
  })
  .addCase(COMFIRM_SEND_TRANSACTION_ERROR, (s, a) => {
    Object.assign(s, { comfirmationLoading: false, confirmationError: a.error, locked: false });
  })
  .addCase(ABORT_TRANSACTION, (s) => {
    Object.assign(s, { comfirmationLoading: false, confirmationMsg: false, fee: false, confirmationError: false, locked: false, sendError: false, sendTx: false });
  })

  .addCase(SEND_TRANSACTION, (s) => {
    Object.assign(s, { sendInProgress: true, sendError: false, sendTx: false });
  })
  .addCase(SEND_TRANSACTION_SUCCESS, (s, a) => {
    Object.assign(s, { sendInProgress: false, sendError: false, sendTx: a.tx });
  })
  .addCase(SEND_TRANSACTION_ERROR, (s, a) => {
    Object.assign(s, { sendInProgress: false, sendError: a.error, sendTx: false });
  }));
