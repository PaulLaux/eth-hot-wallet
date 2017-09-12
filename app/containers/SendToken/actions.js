/*
 *
 * SendToken actions
 *
 */

import {
  CHANGE_AMOUNT,
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_GAS_PRICE,

  COMFIRM_SEND_TRANSACTION,
  COMFIRM_SEND_TRANSACTION_SUCCESS,
  COMFIRM_SEND_TRANSACTION_ERROR,
} from './constants';


export function changeFrom(address) {
  return {
    type: CHANGE_FROM,
    address,
  };
}

export function changeAmount(amount) {
  return {
    type: CHANGE_AMOUNT,
    amount,
  };
}

export function changeTo(address) {
  return {
    type: CHANGE_TO,
    address,
  };
}

export function changeGasPrice(gasPrice) {
  console.log(gasPrice);
  if (gasPrice === '') {
    return {
      type: CHANGE_GAS_PRICE,
      gasPrice: 0,
    };
  }
  return {
    type: CHANGE_GAS_PRICE,
    gasPrice,
  };
}


/**
 * initiate confirmation object
 *
 * @return {object}    An action object with a type of COMFIRM_SEND_TRANSACTION
 */
export function confirmSendTransaction() {
  console.log('sss');
  return {
    type: COMFIRM_SEND_TRANSACTION,
  };
}

/**
 * transaction confirmed successfully
 *
 * @return {object}    An action object with a type of COMFIRM_SEND_TRANSACTION_SUCCESS
 */
export function confirmSendTransactionSuccess() {
  return {
    type: COMFIRM_SEND_TRANSACTION_SUCCESS,
  };
}

/**
 * Error confirming transaction
 *
 * @return {object}    An action object with a type of COMFIRM_SEND_TRANSACTION_ERROR
 */
export function confirmSendTransactionError(error) {
  return {
    type: COMFIRM_SEND_TRANSACTION_ERROR,
    error,
  };
}

