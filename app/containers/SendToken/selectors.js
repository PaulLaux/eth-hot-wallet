import { createSelector } from 'reselect';

/**
 * Direct selector to the sendToken state domain
 */
const selectSendTokenDomain = () => (state) => state.get('sendToken');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SendToken
 */

const makeSelectSendToken = () => createSelector(
  selectSendTokenDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSendToken;
export {
  selectSendTokenDomain,
};
