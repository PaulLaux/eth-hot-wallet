/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.home;


const makeSelectIsShowGenerateWallet = () => createSelector(
  selectHome,
  (homeState) => homeState.isShowGenerateWallet
);

const makeSelectGenerateWalletLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.generateWalletLoading
);

const makeSelectGenerateWalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.generateWalletError
);


const makeSelectGenerateKeystoreLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.generateKeystoreLoading
);

const makeSelectGenerateKeystoreError = () => createSelector(
  selectHome,
  (homeState) => homeState.generateKeystoreError
);

const makeSelectRestoreWalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.restoreWalletError
);

const makeSelectSeed = () => createSelector(
  selectHome,
  (homeState) => homeState.seed
);

const makeSelectPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.password
);

const makeSelectIsComfirmed = () => createSelector(
  selectHome,
  (homeState) => homeState.isComfirmed
);


const makeSelectKeystore = () => createSelector(
  selectHome,
  (homeState) => homeState.keystore
);

const makeSelectShowRestoreWallet = () => createSelector(
  selectHome,
  (homeState) => homeState.isShowRestoreWallet
);

const makeSelectUserSeed = () => createSelector(
  selectHome,
  (homeState) => homeState.userSeed
);
const makeSelectUserPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.userPassword
);

const makeSelectIsShowSendToken = () => createSelector(
  selectHome,
  (homeState) => homeState.isShowSendToken
);

const makeSelectIsShowTokenChooser = () => createSelector(
  selectHome,
  (homeState) => homeState.isShowTokenChooser
);

/*
* Deprecated, use makeSelectAddressMap instead.
*
*/
const makeSelectAddressList = () => createSelector(
  selectHome,
  (homeState) => homeState.addressList
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
    const addressList = homeState.addressList;
    let addressMap = address ? addressList && addressList[address] : addressList;
    if (!addressMap) {
      return null;
    }
    if (address) {
      addressMap = Object.fromEntries(Object.entries(addressMap)
        .filter(([key]) => !(removeIndex && key === 'index') && !(removeEth && key === 'eth')));
    }
    return returnList ? Object.keys(addressMap) : addressMap;
  }
);


const makeSelectAddressListLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.addressListLoading
);
const makeSelectAddressListError = () => createSelector(
  selectHome,
  (homeState) => homeState.addressListError
);
const makeSelectAddressListMsg = () => createSelector(
  selectHome,
  (homeState) => homeState.addressListMsg
);
const makeSelectExchangeRates = () => createSelector(
  selectHome,
  (homeState) => homeState.exchangeRates
);

const makeSelectConvertTo = () => createSelector(
  selectHome,
  (homeState) => homeState.convertTo
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
  (homeState) => (symbol ? homeState.tokenInfo[symbol] : homeState.tokenInfo) || null
);
/* return array of tokens from tokenInfo : ['eth','eos','ppt'] */
const makeSelectTokenInfoList = () => createSelector(
  selectHome,
  (homeState) => Object.keys(homeState.tokenInfo)
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
  (homeState) => Object.fromEntries(Object.entries(homeState.tokenInfo).map(([k, v]) => [k, v.decimals]))
);

const makeSelectSaveWalletLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.saveWalletLoading
);
const makeSelectSaveWalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.saveWalletError
);
const makeSelectLoadWalletLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.loadWalletLoading
);
const makeSelectLoadwalletError = () => createSelector(
  selectHome,
  (homeState) => homeState.loadWalletError
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
