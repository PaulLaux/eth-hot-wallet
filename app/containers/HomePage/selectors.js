/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');


const makeSelectIsShowGenerateWallet = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isShowGenerateWallet')
);

const makeSelectGenerateWalletLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('generateWalletLoading')
);

const makeSelectGenerateWalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('generateWalletError')
);


const makeSelectGenerateKeystoreLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('generateKeystoreLoading')
);

const makeSelectGenerateKeystoreError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('generateKeystoreError')
);

const makeSelectRestoreWalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('restoreWalletError')
);

const makeSelectSeed = () => createSelector(
  selectHome,
  (homeState) => homeState.get('seed')
);

const makeSelectPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('password')
);

const makeSelectIsComfirmed = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isComfirmed')
);

const makeSelectAddressList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('addressList')
);

const makeSelectKeystore = () => createSelector(
  selectHome,
  (homeState) => homeState.get('keystore')
);

const makeSelectShowRestoreWallet = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isShowRestoreWallet')
);

const makeSelectUserSeed = () => createSelector(
  selectHome,
  (homeState) => homeState.get('userSeed')
);
const makeSelectUserPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('userPassword')
);

const makeSelectSendToken = () => createSelector(
  selectHome,
  (homeState) => homeState.get('sendToken')
);

const makeSelectAddressListLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('addressListLoading')
);
const makeSelectAddressListError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('addressListError')
);
const makeSelectAddressListMsg = () => createSelector(
  selectHome,
  (homeState) => homeState.get('addressListMsg')
);
const makeSelectExchangeRates = () => createSelector(
  selectHome,
  (homeState) => homeState.get('exchangeRates')
);
const makeSelectConvertTo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('convertTo')
);


export {
  selectHome,
  makeSelectIsShowGenerateWallet,
  makeSelectGenerateWalletLoading,
  makeSelectGenerateWalletError,
  makeSelectGenerateKeystoreLoading,
  makeSelectGenerateKeystoreError,
  makeSelectRestoreWalletError,
  makeSelectSeed,
  makeSelectPassword,
  makeSelectIsComfirmed,
  makeSelectAddressList,
  makeSelectKeystore,
  makeSelectShowRestoreWallet,
  makeSelectUserSeed,
  makeSelectUserPassword,
  makeSelectSendToken,
  makeSelectAddressListLoading,
  makeSelectAddressListError,
  makeSelectAddressListMsg,
  makeSelectExchangeRates,
  makeSelectConvertTo,
};
