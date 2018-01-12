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

const makeSelectIsShowTokenChooser = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isShowTokenChooser')
);

/*
* Deprecated, use makeSelectAddressMap instead.
*
*/
const makeSelectAddressList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('addressList')
);

/**
 * returns map for specific given address or map of all addresses if no address is given
 * {
 *   index: 1 // optional
 *   eth: {balance: bigNumber / false},
 *   eos: {balance: bigNumber / false},
 *   ppt: {balance: bigNumber / false},
 * }
 * to return array of all adresses use: makeSelectAddress(false, { returnList: true })
 *
 * @param  {string} address as string (optional) returns map of all addresses if not provided
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
    if (!addressMap) {
      return null;
    }
    if (address && removeIndex) {
      addressMap = addressMap.delete('index');
    }
    if (address && removeEth) {
      addressMap = addressMap.delete('eth');
    }
    const returnS = (returnList ? addressMap.keySeq().toArray() : addressMap.toJS());
    return returnS;
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
  (homeState) => homeState.get('exchangeRates').toJS()
);

const makeSelectConvertTo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('convertTo')
);

/**
 * returns details object for specific given symbol or map of all symbols if no symbol is given
 * for makeSelectTokenInfo('symb') we get:
 * {
 *  icon: 'populous_28.png',
 *  name: 'Sample',
 *  contractAddress: '0xd5b3812e67847af90aa5835abd5c253ff5252ec2',
 *  decimals: 1,
 * },
 * returns null if no info for given token symbol
 * to return array of all symbols use: makeSelectAddress(false, { returnList: true })
 *
 * @param  {string} [symbol] as string (optional) returns map of all symbols if not provided
 *
 * @return {object} An object which holds the tokensInfo for given symbol
 */
const makeSelectTokenInfo = (symbol) => createSelector(
  selectHome,
  (homeState) => {
    const tokenInfo = symbol ? homeState.getIn(['tokenInfo', symbol]) : homeState.get('tokenInfo');
    if (tokenInfo) {
      return tokenInfo.toJS();
    }
    return null;
  }
);
/* return array of tokens from tokenInfo : ['eth','eos','ppt'] */
const makeSelectTokenInfoList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tokenInfo').keySeq().toArray()
);

/**
 * returns decimals map for all tokens
 *{
 *  eth: 18,
 *  eos: 18,
 *  ppt: 3
 *},
 * @return {object} An object which holds the decimals map
 */
const makeSelectTokenDecimalsMap = () => createSelector(
  selectHome,
  (homeState) => {
    const tokenInfo = homeState.get('tokenInfo') ? homeState.get('tokenInfo').toJS() : {};
    return Object.assign({}, ...Object.keys(tokenInfo).map((k) => ({ [k]: tokenInfo[k].decimals })));
  }
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
  makeSelectIsShowTokenChooser,

  makeSelectAddressList,
  makeSelectAddressListLoading,
  makeSelectAddressListError,
  makeSelectAddressListMsg,
  makeSelectAddressMap,
  // makeSelectTokenMap,

  makeSelectExchangeRates,
  // makeSelectExchangeRate,
  makeSelectConvertTo,
  makeSelectTokenInfoList,
  makeSelectTokenInfo,
  makeSelectTokenDecimalsMap,

  makeSelectSaveWalletLoading,
  makeSelectSaveWalletError,
  makeSelectLoadWalletLoading,
  makeSelectLoadwalletError,
};
