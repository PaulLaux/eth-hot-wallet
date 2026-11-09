import { createSelector } from 'reselect';
import Network from './network';
/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = (state) => state.header;

const makeSelectLoading = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.loading
);

const makeSelectError = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.error
);

const makeSelectNetworkName = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.networkName
);
const makeSelectPrevNetworkName = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.prevNetworkName
);
const makeSelectTxExplorer = () => createSelector(
  selectHeaderDomain,
  (substate) => Network[substate.networkName].tx_explorer
);
const makeSelectAvailableNetworks = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.availableNetworks
);

const makeSelectBlockNumber = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.blockNumber
);

const makeSelectNetworkReady = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.networkReady
);

const makeSelectCheckingBalanceDoneTime = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.checkingBalanceDoneTime
);

const makeSelectCheckingBalances = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.checkingBalances
);

const makeSelectCheckingBalancesError = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.checkingBalancesError
);

const makeSelectGetExchangeRatesDoneTime = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.getExchangeRatesDoneTime
);

const makeSelectGetExchangeRatesLoading = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.getExchangeRatesLoading
);

const makeSelectGetExchangeRatesError = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.getExchangeRatesError
);

// export default makeSelectHeader;
export {
  selectHeaderDomain,
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectPrevNetworkName,
  makeSelectNetworkName,
  makeSelectTxExplorer,
  makeSelectAvailableNetworks,
  makeSelectBlockNumber,
  makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,
  makeSelectGetExchangeRatesDoneTime,
  makeSelectGetExchangeRatesLoading,
  makeSelectGetExchangeRatesError,
};
