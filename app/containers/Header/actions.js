/*
 *
 * Header actions
 *
 */
import React from 'react';
import { message, Button, notification, Icon } from 'antd';
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
  CLOSE_FAUCET,
} from './constants';


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
    message.error(error);
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
  return {
    type: GET_EXCHANGE_RATES_ERROR,
    error,
  };
}


/* *********************************** Faucet Actions ******************* */

/**
 * Check if faucet availible
 *
 * @return {object}    An action object with a type of CHECK_BALANCES
 */
export function checkFaucet() {
  return {
    type: CHECK_FAUCET,
  };
}

/**
 * checkFaucet successful
 *
 * @return {object}      An action object with a type of CHECK_FAUCET_SUCCESS
 */
export function checkFaucetSuccess() {
  //  message.success('Exchange rates updated succesfully');
  const key = `open${Date.now()}`;
  const btnClick = () => {
    // to hide notification box
    notification.close(key);
  };
  const btn = [
    React.createElement(
      Button,
      { type: 'default', size: 'small', onClick: btnClick },
      'No man'
    ),
    '    ',
    React.createElement(
      Button,
      { type: 'primary', size: 'small', onClick: btnClick },
      'Sure'
    )];
  notification.config({
    placement: 'bottomRight',
  });
  const icon = React.createElement(
    Icon,
    { type: 'pay-circle-o', style: { color: '#108ee9' } }
  );
  notification.open({
    message: 'Ropsten Testnet faucet',
    description: 'Need some test coins for start?',
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
 * getExchangeRates failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_BALANCES_ERROR passing the error
 */
export function checkFaucetError(error) {
  return {
    type: CHECK_FAUCET_ERROR,
    error,
  };
}
