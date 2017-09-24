import { createSelector } from 'reselect';

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = (state) => state.get('header');

const makeSelectLoading = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('error')
);

const makeSelectNetworkName = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('networkName')
);
const makeSelectAvailableNetworks = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('availableNetworks')
);

const makeSelectBlockNumber = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('blockNumber')
);

/* Will return null if header didn't loaded yet (initial load)*/
const makeSelectNetworkReady = () => createSelector(
  selectHeaderDomain,
  (substate) => substate ? substate.get('networkReady') : null
);

const makeSelectCheckingBalanceDoneTime = () => createSelector(
  selectHeaderDomain,
  (substate) => substate ? substate.get('checkingBalanceDoneTime') : null
);

const makeSelectCheckingBalances = () => createSelector(
  selectHeaderDomain,
  (substate) => substate ? substate.get('checkingBalances') : null
);

const makeSelectCheckingBalancesError = () => createSelector(
  selectHeaderDomain,
  (substate) => substate ? substate.get('checkingBalancesError') : null
);

// export default makeSelectHeader;
export {
  selectHeaderDomain,
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
  makeSelectAvailableNetworks,
  makeSelectBlockNumber,
  makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,
};


/*
const makeSelectHeader = () => createSelector(
  selectHeaderDomain(),
  (substate) => substate.toJS()
);*/
