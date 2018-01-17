/*
 *
 * Header actions
 *
 */
import React from 'react';
import { message, Button, notification, Icon } from 'antd';
import FaucetDescription from 'components/FaucetDescription';
import { offlineModeString } from 'utils/constants';

import {
  LOAD_NETWORK,
  LOAD_NETWORK_SUCCESS,
  LOAD_NETWORK_ERROR,

  CHECK_BALANCES,
  CHECK_BALANCES_SUCCESS,
  CHECK_BALANCES_ERROR,
  STOP_POLL_BALANCES,

  GET_EXCHANGE_RATES,
  GET_EXCHANGE_RATES_SUCCESS,
  GET_EXCHANGE_RATES_ERROR,

  CHECK_FAUCET,
  CHECK_FAUCET_SUCCESS,
  CHECK_FAUCET_ERROR,
  ASK_FAUCET,
  ASK_FAUCET_SUCCESS,
  ASK_FAUCET_ERROR,
} from './constants';

import { store } from '../../app';

/**
 * Connect to eth network using address from network.js file
 *
 * @return {object}    An action object with a type of LOAD_NETWORK
 */
export function loadNetwork(networkName) {
  return {
    type: LOAD_NETWORK,
    networkName,
  };
}

/**
 * Dispatched when connected to network successfuly by the loadNetwork saga
 *
 * @param  {string} blockNumber The current block number
 *
 * @return {object}      An action object with a type of LOAD_NETWORK_SUCCESS passing the repos
 */
export function loadNetworkSuccess(blockNumber) {
  message.success(`Connected sucessfully, current block: ${blockNumber}`);
  return {
    type: LOAD_NETWORK_SUCCESS,
    blockNumber,
  };
}

/**
 * Dispatched when network connection fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_NETWORK_ERROR passing the error
 */
export function loadNetworkError(error) {
  if (error !== offlineModeString) {
    const err = error.indexOf('Invalid JSON RPC response from host provider') >= 0 ?
      `${error}, Check Internet connection and connectivity to RPC` : error;
    message.error(err, 10);
  }
  return {
    type: LOAD_NETWORK_ERROR,
    error,
  };
}


/* *********************************** Check Balances Actions ******************* */
/**
 * Initiate process to check balance of all known addresses
 *
 * @return {object}    An action object with a type of CHECK_BALANCES
 */
export function checkBalances() {
  return {
    type: CHECK_BALANCES,
  };
}

/**
 * checkBalances successful
 *
 * @return {object}      An action object with a type of CHECK_BALANCES_SUCCESS
 */
export function checkBalancesSuccess() {
  const timeString = new Date().toLocaleTimeString();
  // message.success('Balances updated succesfully');
  return {
    type: CHECK_BALANCES_SUCCESS,
    timeString,
  };
}

/**
 * checkBalances failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_BALANCES_ERROR passing the error
 */
export function CheckBalancesError(error) {
  message.error(error);
  return {
    type: CHECK_BALANCES_ERROR,
    error,
  };
}


/**
 * Stop polling balances when going to offline mode
 *
 * @return {object} An action object with a type of STOP_POLL_BALANCES
 */
export function stopPollingBalances() {
  return {
    type: STOP_POLL_BALANCES,
  };
}

/* *********************************** Get Exchange Rate Actions ******************* */
/**
 * Get exchange rates from api
 *
 * @return {object}    An action object with a type of CHECK_BALANCES
 */
export function getExchangeRates() {
  return {
    type: GET_EXCHANGE_RATES,
  };
}

/**
 * getExchangeRates successful
 *
 * @return {object}      An action object with a type of GET_EXCHANGE_RATES_SUCCESS
 */
export function getExchangeRatesSuccess() {
  const timeString = new Date().toLocaleTimeString();
  message.success('Exchange rates updated succesfully');
  return {
    type: GET_EXCHANGE_RATES_SUCCESS,
    timeString,
  };
}

/**
 * getExchangeRates failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_BALANCES_ERROR passing the error
 */
export function getExchangeRatesError(error) {
  message.error(error);
  return {
    type: GET_EXCHANGE_RATES_ERROR,
    error,
  };
}


/* *********************************** Faucet Actions ******************* */

/**
 * Check if faucet availible
 *
 * @return {object}    An action object with a type of CHECK_FAUCET
 */
export function checkFaucet() {
  return {
    type: CHECK_FAUCET,
  };
}

/**
 * checkFaucet successful will pop notification which can used to ask faucet
 *
 * @return {object}      An action object with a type of CHECK_FAUCET_SUCCESS
 */
export function checkFaucetSuccess() {
  //  message.success('Exchange rates updated succesfully');
  const key = `open${Date.now()}`;
  const closeNotification = () => {
    // to hide notification box
    notification.close(key);
  };
  const ask = () => {
    // to hide notification box
    notification.close(key);
    store.dispatch(askFaucet());
  };
  const btn = [
    React.createElement(
      Button,
      { key: 'b1', type: 'default', size: 'default', onClick: closeNotification },
      'No man'
    ),
    '  ',
    React.createElement(
      Button,
      { key: 'b2', type: 'primary', size: 'default', onClick: ask },
      'Sure'
    )];
  notification.config({
    placement: 'bottomRight',
  });
  const icon = React.createElement(
    Icon,
    { type: 'bulb', style: { color: '#108ee9' } }
  );
  notification.open({
    message: 'Ropsten Testnet faucet',
    description: 'Need some coins for testing?',
    duration: 10,
    key,
    btn,
    icon,
  });
  return {
    type: CHECK_FAUCET_SUCCESS,
  };
}

/**
 * checkFaucetError failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_FAUCET_ERROR passing the error
 */
export function checkFaucetError(error) {
  return {
    type: CHECK_FAUCET_ERROR,
    error,
  };
}

/**
 * Check if faucet availible
 *
 * @return {object}    An action object with a type of ASK_FAUCET
 */
export function askFaucet() {
  const icon = React.createElement(Icon, { type: 'loading' });
  notification.info({
    message: 'Sending request',
    description: 'Please wait',
    duration: 30,
    key: 'ask',
    icon,
  });
  return {
    type: ASK_FAUCET,
  };
}

/**
 * checkFaucet successful will pop notification which can used to ask faucet
 *
 * @return {object}      An action object with a type of ASK_FAUCET_SUCCESS
 */
export function askFaucetSuccess(tx) {
  notification.close('ask');
  const key = `open${Date.now()}`;
  const closeNotification = () => {
    notification.close(key);
  };
  const btn = React.createElement(Button, { type: 'default', size: 'small', onClick: closeNotification }, 'Got it');
  const description = React.createElement(FaucetDescription, { tx, text: 'Check balance in ~30 seconds. TX:' });
  notification.success({
    message: 'Faucet request sucessfull',
    description,
    duration: 10,
    key,
    btn,
  });

  return {
    type: ASK_FAUCET_SUCCESS,
    tx,
  };
}

/**
 * askFaucetError
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of ASK_FAUCET_ERROR passing the error
 */
export function askFaucetError(error) {
  const key = `open${Date.now()}`;
  const closeNotification = () => {
    notification.close(key);
  };
  const btn = React.createElement(Button, { type: 'default', size: 'small', onClick: closeNotification }, 'Got it');
  notification.error({
    message: 'Faucet request failed',
    description: `${error}. Please try again later`,
    duration: 10,
    key,
    btn,
  });
  return {
    type: ASK_FAUCET_ERROR,
    error,
  };
}
