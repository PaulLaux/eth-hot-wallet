
import { createSelector } from 'reselect';

/**
 * Direct selector to the sendToken state domain
 */
const selectSendTokenDomain = (state) => state.get('sendtoken');


const makeSelectShowSendToken = () => createSelector(
  selectSendTokenDomain,
  (substate) => { substate.get('showSendToken'); }
);

// export default makeSelectSendToken;
export {
  selectSendTokenDomain,
  makeSelectShowSendToken,
};
