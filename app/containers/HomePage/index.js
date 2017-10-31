/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';

// import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Button } from 'antd';

/* Components:  */
import SeedView from 'components/SeedView';
import AddressView from 'components/AddressView';
import SendTokenView from 'components/SendTokenView';
import RestoreWallet from 'components/RestoreWallet';
import GenerateWalletModal from 'components/GenerateWalletModal';

/* Header: */
import Header from 'containers/Header';
import { loadNetwork, checkBalances, getExchangeRates } from 'containers/Header/actions';
import {
  makeSelectNetworkReady,
  makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,
} from 'containers/Header/selectors';

/* SendToken */
import { changeFrom } from 'containers/SendToken/actions';

/* General */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';


/* HomePage */
import {
  generateWallet,
  generateWalletCancel,
  initSeed,
  showRestoreWallet,
  generateKeystore,
  changeUserSeed,
  restoreWalletFromSeed,
  showSendToken, // TODO: FIX
  generateAddress,
  lockWallet,
  unlockWallet,
  selectCurrency,
} from './actions';

import {
  makeSelectIsShowGenerateWallet,
  makeSelectGenerateWalletLoading,
  makeSelectGenerateWalletError,
  makeSelectSeed,
  makeSelectGenerateKeystoreLoading,
  makeSelectGenerateKeystoreError,
  makeSelectPassword,
  makeSelectIsComfirmed,
  makeSelectUserSeed,
  makeSelectAddressList,
  // makeSelectKeystore,
  makeSelectShowRestoreWallet,
  makeSelectSendToken,
  makeSelectAddressListLoading,
  makeSelectAddressListError,
  makeSelectAddressListMsg,
  makeSelectExchangeRates,
  makeSelectConvertTo,
} from './selectors';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onGenerateWallet,
      onGenerateWalletCancel,
      isShowGenerateWallet,
      generateWalletLoading,
      generateWalletError,

      generateKeystoreLoading,
      generateKeystoreError,
      seed,
      password,
      onGenerateKeystore,
      onGenerateAddress,
      onCheckBalances,
      isComfirmed,
      addressList,
      onChangeFrom,
      isShowRestoreWallet,
      userSeed,
      onChangeUserSeed,
      onRestoreWalletFromSeed,
      sendToken,

      addressListLoading,
      addressListError,
      addressListMsg,

      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,

      onLockWallet,
      onUnlockWallet,

      exchangeRates,
      onSelectCurrency,
      convertTo,
      onGetExchangeRates,
    } = this.props;

    /*
    const seedViewProps = {
      loading,
      error,
      seed,
      password,
      onGenerateKeystore,
    }; */

    const generateWalletProps = {
      isShowGenerateWallet,
      generateWalletLoading,
      generateWalletError,

      seed,
      password,

      onGenerateWallet,
      onGenerateWalletCancel,
      onGenerateKeystore,
    };

    const restoreWalletProps = { isShowRestoreWallet, userSeed, onChangeUserSeed, onRestoreWalletFromSeed };

    const addressViewProps = {
      generateKeystoreLoading,
      generateKeystoreError,
      isComfirmed,
      addressList,
      onChangeFrom,
      onCheckBalances,
      onGenerateAddress,
      addressListLoading,
      addressListError,
      addressListMsg,
      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,
      onLockWallet,
      onUnlockWallet,
      onSelectCurrency,
      exchangeRates,
      convertTo,
    };

    return (
      <div>
        <Header />
        <Button type="primary" size="large" onClick={onGenerateWallet}>
          Generate wallet
        </Button>
        {' '}
        <Button type="default" size="large" onClick={this.props.onShowRestoreWallet}>
          Restore wallet
        </Button>

        <GenerateWalletModal {...generateWalletProps} />

        <RestoreWallet {...restoreWalletProps} />
        {/* <SeedView {...seedViewProps} /> */}
        <hr />
        <AddressView {...addressViewProps} />
        <br />
        <button onClick={onGetExchangeRates}>
          GetExchangeRates
      </button>
        <hr />
        <SendTokenView {...{ sendToken }} />
      </div>
    );
  }
}

HomePage.propTypes = {
  onGenerateWallet: PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),

  generateKeystoreLoading: PropTypes.bool,
  generateKeystoreError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),

  // onInitSeed: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
  onGenerateAddress: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
  onCheckBalances: PropTypes.func,

  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeFrom: PropTypes.func,

  onLockWallet: PropTypes.func,
  onUnlockWallet: PropTypes.func,

  isComfirmed: PropTypes.bool,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  sendToken: PropTypes.bool,

  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onGetExchangeRates: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGenerateWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateWallet());
    },
    onGenerateWalletCancel: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateWalletCancel());
    },
    onInitSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(initSeed());
    },
    onGenerateKeystore: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateKeystore());
    },
    onGenerateAddress: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAddress());
    },
    onLoadNetwork: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork('local'));
    },
    onShowRestoreWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(showRestoreWallet());
    },
    onChangeUserSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(changeUserSeed(evt.target.value));
    },
    onRestoreWalletFromSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(restoreWalletFromSeed());
    },
    onCheckBalances: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkBalances());
    },
    onChangeFrom: (address) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(showSendToken());//.then(
      dispatch(changeFrom(address));
    },
    onLockWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(lockWallet());
    },
    onUnlockWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(unlockWallet());
    },
    onSelectCurrency: (convertTo) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectCurrency(convertTo));
    },
    onGetExchangeRates: () => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getExchangeRates());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isShowGenerateWallet: makeSelectIsShowGenerateWallet(),
  generateWalletLoading: makeSelectGenerateWalletLoading(),
  generateWalletError: makeSelectGenerateWalletError(),
  seed: makeSelectSeed(),
  password: makeSelectPassword(),

  generateKeystoreLoading: makeSelectGenerateKeystoreLoading(),
  generateKeystoreError: makeSelectGenerateKeystoreError(),
  isComfirmed: makeSelectIsComfirmed(),
  addressList: makeSelectAddressList(),
  // keystore: makeSelectKeystore(),
  isShowRestoreWallet: makeSelectShowRestoreWallet(),
  userSeed: makeSelectUserSeed(),
  sendToken: makeSelectSendToken(),

  addressListLoading: makeSelectAddressListLoading(),
  addressListError: makeSelectAddressListError(),
  addressListMsg: makeSelectAddressListMsg(),

  networkReady: makeSelectNetworkReady(),
  checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(),

  exchangeRates: makeSelectExchangeRates(),
  convertTo: makeSelectConvertTo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
