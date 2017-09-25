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

import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';


/* Components:  */
import SeedView from 'components/SeedView';
import AddressView from 'components/AddressView';
import SendTokenView from 'components/SendTokenView';
import RestoreWallet from 'components/RestoreWallet';

/* Header: */
import Header from 'containers/Header';
import { loadNetwork, checkBalances } from 'containers/Header/actions';
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
import messages from './messages';

/* HomePage */
import {
  initSeed,
  showRestoreWallet,
  generateKeystore,
  changeUserSeed,
  restoreWalletFromSeed,
  showSendToken, // TODO: FIX
  generateAddress,
} from './actions';

import {
  makeSelectSeed,
  makeSelectLoading,
  makeSelectError,
  makeSelectPassword,
  makeSelectIsComfirmed,
  makeSelectUserSeed,
  makeSelectAddressList,
  // makeSelectKeystore,
  makeSelectShowRestoreWallet,
  makeSelectSendToken,
} from './selectors';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      loading,
      error,
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
      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,
    } = this.props;

    const seedViewProps = {
      loading,
      error,
      seed,
      password,
      onGenerateKeystore,
    };
    const restoreWalletProps = { isShowRestoreWallet, userSeed, onChangeUserSeed, onRestoreWalletFromSeed };

    const addressViewProps = {
      isComfirmed, addressList, onChangeFrom, onCheckBalances, networkReady, checkingBalanceDoneTime, checkingBalances, checkingBalancesError, onGenerateAddress,
    };

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Header />
        <button onClick={this.props.onInitSeed}>
          Generate wallet
          </button>
        {' '}
        <button onClick={this.props.onShowRestoreWallet}>
          Restore wallet
          </button>
        <RestoreWallet {...restoreWalletProps} />
        <SeedView {...seedViewProps} />
        <hr />
        <AddressView {...addressViewProps} />
        <br />
        <hr />
        <SendTokenView {...{ sendToken }} />
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
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

  onInitSeed: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
  onGenerateAddress: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
  onCheckBalances: PropTypes.func,

  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeFrom: PropTypes.func,

  isComfirmed: PropTypes.bool,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  sendToken: PropTypes.bool,

  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export function mapDispatchToProps(dispatch) {
  return {
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
  };
}

const mapStateToProps = createStructuredSelector({
  seed: makeSelectSeed(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isComfirmed: makeSelectIsComfirmed(),
  addressList: makeSelectAddressList(),
  // keystore: makeSelectKeystore(),
  isShowRestoreWallet: makeSelectShowRestoreWallet(),
  userSeed: makeSelectUserSeed(),
  sendToken: makeSelectSendToken(),

  networkReady: makeSelectNetworkReady(),
  checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
