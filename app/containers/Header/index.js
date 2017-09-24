/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NetworkLabel from 'components/NetworkLabel';
import NetworkSelector from 'components/NetworkSelector';

// import { changeBalance } from 'containers/HomePage/actions';
import { makeSelectAddressList } from 'containers/HomePage/selectors';

import {
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
  makeSelectBlockNumber,
  makeSelectAvailableNetworks,
  /*makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,*/
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNetwork } from './actions';

function Header(props) {
  const { loading, error, networkName, blockNumber, availableNetworks, onLoadNetwork } = props;
  const networkLabelProps = {
    loading,
    error,
    networkName,
    blockNumber,
  };

  const networkSelectorProps = { networkName, availableNetworks, onLoadNetwork };

  // const { checkingBalanceDoneTime, checkingBalances, checkingBalancesError } = props;

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <NetworkLabel {...networkLabelProps} />
      <NetworkSelector {...networkSelectorProps} />
      <br />
      <button onClick={onLoadNetwork}>
        Load Network
      </button>
      <br />
      <hr />
    </div>
  );
}

Header.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  // onCheckBalances: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  networkName: PropTypes.string,
  availableNetworks: PropTypes.object,
  blockNumber: PropTypes.number,
  // addressList: PropTypes.oneOfType([ PropTypes.bool,PropTypes.object]),

  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  networkReady: makeSelectNetworkReady(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  networkName: makeSelectNetworkName(),
  availableNetworks: makeSelectAvailableNetworks(),
  blockNumber: makeSelectBlockNumber(),
  addressList: makeSelectAddressList(),
  /*checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(),*/
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadNetwork: (name) => {
      //if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      console.log(name);
      dispatch(loadNetwork(name));
    },
    /*
    onChangeAddress: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(changeBalance('5676e455eec7464b44ecf4d0a8f00342166b80ad', 5));
    },*/
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
