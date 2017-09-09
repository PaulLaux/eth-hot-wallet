
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

const makeSelectGasPrice = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('gasPrice')
);

const makeSelectComfirmationLoading = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('comfirmationLoading')
);

const makeSelectConfirmationError = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('confirmationError')
);

const makeSelectConfirmationMsg = () => createSelector(
  selectSendTokenDomain,
  (substate) => substate.get('confirmationMsg')
);

// export default makeSelectSendToken;
export {
  selectSendTokenDomain,

  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectGasPrice,

  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
};
