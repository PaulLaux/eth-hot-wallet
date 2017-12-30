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

const makeSelectIsShowSendToken = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isShowSendToken')
);

const makeSelectAddressList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('addressList')
);


/**
 * returns token map for a given address with / without index key
 * {
 *   index: 1 // optional
 *   eth: {balance: bigNumber / false},
 *   eos: {balance: bigNumber / false},
 *   ppt: {balance: bigNumber / false},
 * }
 *
 * @param  {string} address as string
 * @param  {bool} hasIndex should returned map include the index key?
 *
 * @return {object} An object which holds the tokens and balances
 */
const makeSelectTokenMap = (address, hasIndex = false) => createSelector(
  selectHome,
  (homeState) => {
    const tokenMap = homeState.get('addressList').getIn([address]);
    const cleanTokenMap = hasIndex ? tokenMap.toJS() : tokenMap.delete('index').toJS();
    // console.log(cleanTokenMap);
    return cleanTokenMap;
  }
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
const makeSelectTokenInfo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tokenInfo')
);
/* return array of tokens from tokenInfo : ['eth','eos','ppt'] */
const makeSelectTokenInfoList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tokenInfo').keySeq().toArray()
);
/*
const makeSelectIsLocalStorageWallet = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isLocalStorageWallet')
);
const makeSelectCheckLocalStorageLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('checkLocalStorageLoading')
); */

const makeSelectSaveWalletLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('saveWalletLoading')
);
const makeSelectSaveWalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('saveWalletError')
);
const makeSelectLoadWalletLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadWalletLoading')
);
const makeSelectLoadwalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadWalletError')
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
  makeSelectKeystore,
  makeSelectShowRestoreWallet,
  makeSelectUserSeed,
  makeSelectUserPassword,
  makeSelectIsShowSendToken,

  makeSelectAddressList,
  makeSelectAddressListLoading,
  makeSelectAddressListError,
  makeSelectAddressListMsg,
  makeSelectTokenMap,

  makeSelectExchangeRates,
  makeSelectConvertTo,
  makeSelectTokenInfoList,
  makeSelectTokenInfo,

  makeSelectSaveWalletLoading,
  makeSelectSaveWalletError,
  makeSelectLoadWalletLoading,
  makeSelectLoadwalletError,
};
