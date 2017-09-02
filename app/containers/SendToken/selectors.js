
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

// export default makeSelectSendToken;
export {
  selectSendTokenDomain,
  makeSelectFrom,
  makeSelectTo,
};
