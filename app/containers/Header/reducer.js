/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
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

import Network from './network';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  networkReady: false, // true only if network initialized and valid keystore attached
  networkName: 'Offline',
  blockNumber: 0,
  availableNetworks: Object.keys(Network),

  checkingBalanceDoneTime: false, // should update after every succesfull balance check
  checkingBalances: false,
  checkingBalancesError: false,

  getEchangeRatesDoneTime: false, // should update after every succesfull echange rate check
  getEchangeRatesLoading: false,
  getEchangeRatesError: false,

});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NETWORK:
      return state
        .set('loading', true)
        .set('error', false)
        .set('networkName', action.networkName);
    case LOAD_NETWORK_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('blockNumber', action.blockNumber)
        .set('networkReady', true);
    case LOAD_NETWORK_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('networkReady', false);

    case CHECK_BALANCES:
      return state
        .set('checkingBalances', true)
        .set('checkingBalancesError', false)
        .set('checkingBalanceDoneTime', false);
    case CHECK_BALANCES_SUCCESS:
      return state
        .set('checkingBalances', false)
        .set('checkingBalancesError', false)
        .set('checkingBalanceDoneTime', action.timeString);
    case CHECK_BALANCES_ERROR:
      return state
        .set('checkingBalances', false)
        .set('checkingBalancesError', action.error)
        .set('checkingBalanceDoneTime', false);

    case GET_EXCHANGE_RATES:
      return state
        .set('getEchangeRatesLoading', true)
        .set('getEchangeRatesError', false)
        .set('getEchangeRatesDoneTime', false);
    case GET_EXCHANGE_RATES_SUCCESS:
      return state
        .set('getEchangeRatesLoading', false)
        .set('getEchangeRatesError', false)
        .set('getEchangeRatesDoneTime', action.timeString);
    case GET_EXCHANGE_RATES_ERROR:
      return state
        .set('getEchangeRatesLoading', false)
        .set('getEchangeRatesError', action.error)
        .set('getEchangeRatesDoneTime', false);

    default:
      return state;
  }
}

export default headerReducer;
