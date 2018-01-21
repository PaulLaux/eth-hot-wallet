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

  ABORT_TRANSACTION,
  SEND_TRANSACTION,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,
} from './constants';

/**
 * Update from address and token, both parameters are optional
 * @param  {string} [address] '0xffd..'
 * @param  {object} [sendTokenSymbol] tokens to send (eth not included)
 *
 * @return {object}    An action object with a type of CHANGE_FROM, address and sendTokenSymbol
 */
export function changeFrom(address, sendTokenSymbol) {
  return {
    type: CHANGE_FROM,
    address,
    sendTokenSymbol,
  };
}

export function changeAmount(amount) {
  return {
    type: CHANGE_AMOUNT,
    amount,
  };
}

export function changeTo(inputAddress) {
  // remove unnessesery spaces
  const address = inputAddress.replace(/^\s+|\s+$/g, '');
  return {
    type: CHANGE_TO,
    address,
  };
}

export function changeGasPrice(gasPrice) {
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
  return {
    type: COMFIRM_SEND_TRANSACTION,
  };
}

/**
 * transaction confirmed successfully
 *
 * @return {object}    An action object with a type of COMFIRM_SEND_TRANSACTION_SUCCESS
 */
export function confirmSendTransactionSuccess(msg) {
  if (msg) {
    return {
      type: COMFIRM_SEND_TRANSACTION_SUCCESS,
      msg,
    };
  }

  return {
    type: COMFIRM_SEND_TRANSACTION_SUCCESS,
    msg: 'Transaction confirmed successfully, Send to transmit',
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

/**
 * Abort transaction aftrer it has been confirmed
 *
 * @return {object}    An action object with a type of ABORT_TRANSACTION
 */
export function abortTransaction() {
  return {
    type: ABORT_TRANSACTION,
  };
}

/**
 * initiate Send
 *
 * @return {object}    An action object with a type of SEND_TRANSACTION
 */
export function sendTransaction() {
  return {
    type: SEND_TRANSACTION,
  };
}

/**
 * transaction sent successfully
 *
 * @return {object}    An action object with a type of SEND_TRANSACTION_SUCCESS
 */
export function sendTransactionSuccess(tx) {
  return {
    type: SEND_TRANSACTION_SUCCESS,
    tx,
  };
}

/**
 * Error sending transaction
 *
 * @return {object}    An action object with a type of SEND_TRANSACTION_ERROR
 */
export function sendTransactionError(error) {
  return {
    type: SEND_TRANSACTION_ERROR,
    error,
  };
}

