/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import { CLOSE_WALLET } from 'containers/HomePage/constants';
import { defaultNetwork } from 'utils/constants';
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

  ASK_FAUCET_ERROR,
  ASK_FAUCET_SUCCESS,

} from './constants';


import Network from './network';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  networkReady: false, // true only if network initialized and valid keystore attached
  prevNetworkName: defaultNetwork,
  networkName: 'Offline',
  blockNumber: 0,
  availableNetworks: Object.keys(Network),

  checkingBalanceDoneTime: false, // should update after every succesfull balance check
  checkingBalances: false, // Loading
  checkingBalancesError: false,

  getExchangeRatesDoneTime: false, // should update after every succesfull exchange rate check
  getExchangeRatesLoading: false,
  getExchangeRatesError: false,

  usedFaucet: false, // to prevent offer more then once
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NETWORK:
      return state
        .set('loading', true)
        .set('error', false)
        // dont change prevNetworkName when going online
        .set('prevNetworkName', (state.get('networkName') === 'Offline') ? state.get('prevNetworkName') : state.get('networkName'))
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
        .set('getExchangeRatesLoading', true)
        .set('getExchangeRatesError', false)
        .set('getExchangeRatesDoneTime', false);
    case GET_EXCHANGE_RATES_SUCCESS:
      return state
        .set('getExchangeRatesLoading', false)
        .set('getExchangeRatesError', false)
        .set('getExchangeRatesDoneTime', action.timeString);
    case GET_EXCHANGE_RATES_ERROR:
      return state
        .set('getExchangeRatesLoading', false)
        .set('getExchangeRatesError', action.error)
        .set('getExchangeRatesDoneTime', false);

    case ASK_FAUCET_SUCCESS:
      return state
        .set('usedFaucet', true);
    case ASK_FAUCET_ERROR:
      return state;

    case CLOSE_WALLET:
      return state
        .set('usedFaucet', false);

    default:
      return state;
  }
}

export default headerReducer;
