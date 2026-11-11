/*
 *
 * Header reducer
 *
 */

import { createReducer } from '@reduxjs/toolkit';
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
} from './constants';


import Network from './network';

// The initial state of the App
const initialState = {
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
};

export default createReducer(initialState, (builder) => builder
  .addCase(LOAD_NETWORK, (s, a) => {
    // dont change prevNetworkName when going online
    if (s.networkName !== 'Offline') s.prevNetworkName = s.networkName;
    Object.assign(s, { loading: true, error: false, networkName: a.networkName });
  })
  .addCase(LOAD_NETWORK_SUCCESS, (s, a) => {
    Object.assign(s, { loading: false, error: false, blockNumber: a.blockNumber, networkReady: true });
  })
  .addCase(LOAD_NETWORK_ERROR, (s, a) => {
    Object.assign(s, { loading: false, error: a.error, networkReady: false });
  })

  .addCase(CHECK_BALANCES, (s) => {
    Object.assign(s, { checkingBalances: true, checkingBalancesError: false, checkingBalanceDoneTime: false });
  })
  .addCase(CHECK_BALANCES_SUCCESS, (s, a) => {
    Object.assign(s, { checkingBalances: false, checkingBalancesError: false, checkingBalanceDoneTime: a.timeString });
  })
  .addCase(CHECK_BALANCES_ERROR, (s, a) => {
    Object.assign(s, { checkingBalances: false, checkingBalancesError: a.error, checkingBalanceDoneTime: false });
  })

  .addCase(GET_EXCHANGE_RATES, (s) => {
    Object.assign(s, { getExchangeRatesLoading: true, getExchangeRatesError: false, getExchangeRatesDoneTime: false });
  })
  .addCase(GET_EXCHANGE_RATES_SUCCESS, (s, a) => {
    Object.assign(s, { getExchangeRatesLoading: false, getExchangeRatesError: false, getExchangeRatesDoneTime: a.timeString });
  })
  .addCase(GET_EXCHANGE_RATES_ERROR, (s, a) => {
    Object.assign(s, { getExchangeRatesLoading: false, getExchangeRatesError: a.error, getExchangeRatesDoneTime: false });
  }));
