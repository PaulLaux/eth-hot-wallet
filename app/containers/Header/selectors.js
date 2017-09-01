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

const makeSelectBlockNumber = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('blockNumber')
);

const makeSelectNetworkReady = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('networkReady')
);

const makeSelectCheckingBalanceDoneTime = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('checkingBalanceDoneTime')
);

const makeSelectCheckingBalances = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('checkingBalances')
);

const makeSelectCheckingBalancesError = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('checkingBalancesError')
);

// export default makeSelectHeader;
export {
  selectHeaderDomain,
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
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
