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
 * returns map for specific given address or map of addresses if nothing given
 * {
 *   index: 1 // optional
 *   eth: {balance: bigNumber / false},
 *   eos: {balance: bigNumber / false},
 *   ppt: {balance: bigNumber / false},
 * }
 * to return array of adresses use: makeSelectAddress(false, { returnList: true })
 *
 * @param  {string} address as string (optional) returns all addresses if not provided
 * @param  {object} options may include the following:
 * @param  {boolean} options.returnList should returned array from keys instead of map? (optional)
 * @param  {boolean} options.removeIndex should remove the key index? (optional)
 * @param  {boolean} options.removeEth should remove the key eth? (optional)
 *
 * @return {object} An object which holds the tokens and balances or array
 */
const makeSelectAddressMap = (address, options = {}) => createSelector(
  selectHome,
  (homeState) => {
    const { returnList, removeIndex, removeEth } = options;
    let addressMap = address ? homeState.getIn(['addressList', address]) : homeState.get('addressList');
    if (address && removeIndex) {
      addressMap = addressMap.delete('index');
    }
    if (address && removeEth) {
      addressMap = addressMap.delete('eth');
    }
    return (returnList ? addressMap.keySeq().toArray() : addressMap.toJS());
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

const makeSelectTokenInfo = (symbol) => createSelector(
  selectHome,
  (homeState) => {
    const tokenInfo = symbol ? homeState.get('tokenInfo') : homeState.getIn(['tokenInfo', symbol]);
    return tokenInfo.toJS();
  }
);
/* return array of tokens from tokenInfo : ['eth','eos','ppt'] */
const makeSelectTokenInfoList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tokenInfo').keySeq().toArray()
);

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
  makeSelectAddressMap,
  // makeSelectTokenMap,

  makeSelectExchangeRates,
  makeSelectConvertTo,
  makeSelectTokenInfoList,
  makeSelectTokenInfo,

  makeSelectSaveWalletLoading,
  makeSelectSaveWalletError,
  makeSelectLoadWalletLoading,
  makeSelectLoadwalletError,
};
