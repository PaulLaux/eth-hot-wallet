
import { createSelector } from 'reselect';

/**
 * Direct selector to the sendToken state domain
 */
const selectSendTokenDomain = (state) => state.get('sendtoken');


const makeSelectFrom = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('from')
);

const makeSelectTo = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('to')
);

const makeSelectAmount = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('amount')
);

// export default makeSelectSendToken;
export {
  selectSendTokenDomain,
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
};
