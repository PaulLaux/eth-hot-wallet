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
} from './constants';

import Network from './network';

console.log(Object.keys(Network));
// The initial state of the App
const initialState = fromJS({
  networkReady: false, // true only if network initialized and valid keystore attached
  networkName: 'Offline',
  blockNumber: 0,
  availableNetworks: Object.keys(Network),

  loading: false,
  error: false,

  checkingBalanceDoneTime: false, // should be updated after every succesfull balance check
  checkingBalances: false,
  checkingBalancesError: false,
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

    default:
      return state;
  }
}

export default headerReducer;
