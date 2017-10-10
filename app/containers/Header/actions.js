/*
 *
 * Header actions
 *
 */

import {
  LOAD_NETWORK,
  LOAD_NETWORK_SUCCESS,
  LOAD_NETWORK_ERROR,

  CHECK_BALANCES,
  CHECK_BALANCES_SUCCESS,
  CHECK_BALANCES_ERROR,

  GET_EXCHANGE_RATES,
  GET_EXCHANGE_RATES_SUCCESS,
  GET_EXCHANGE_RATES_ERROR,
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


/* *********************************** Get Exchange Rate Actions ********************/
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
