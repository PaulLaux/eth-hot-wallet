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

// The initial state of the App
const initialState = fromJS({
  networkReady: false, // true only if network initialized and valid keystore attached
  networkName: '',
  blockNumber: 0,

  loading: false,
  error: false,

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
        .set('checkingBalancesError', false);
    case CHECK_BALANCES_SUCCESS:
      return state
        .set('checkingBalances', false)
        .set('checkingBalancesError', false);
    // .set('blockNumber', action.blockNumber)
    case CHECK_BALANCES_ERROR:
      return state
        .set('checkingBalances', false)
        .set('checkingBalancesError', action.error);

    default:
      return state;
  }
}

export default headerReducer;
