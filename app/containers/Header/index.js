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
import CheckBalancesStatus from 'components/CheckBalancesStatus';

// import { changeBalance } from 'containers/HomePage/actions';
import { makeSelectAddressList } from 'containers/HomePage/selectors';

import {
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
  makeSelectBlockNumber,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNetwork, checkBalances } from './actions';

function Header(props) {
  const { loading, error, networkName, blockNumber } = props;
  const networkLabelProps = {
    loading,
    error,
    networkName,
    blockNumber,
  };

  const { checkingBalances, checkingBalancesError } = props;
  const CheckBalancesStatusProps = { checkingBalances, checkingBalancesError };

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <NetworkLabel {...networkLabelProps} />
      <br />
      <button onClick={props.onLoadNetwork}>
        Load Network
      </button>
      {' '}
      <button type="button" disabled={!props.networkReady} onClick={props.onCheckBalances}>
        Check balance
      </button>
      <br />
      <CheckBalancesStatus {...CheckBalancesStatusProps} />
      <hr />
    </div>
  );
}

Header.propTypes = {
  networkReady: PropTypes.bool,
  onLoadNetwork: PropTypes.func.isRequired,
  onCheckBalances: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  networkName: PropTypes.string,
  blockNumber: PropTypes.number,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  networkReady: makeSelectNetworkReady(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  networkName: makeSelectNetworkName(),
  blockNumber: makeSelectBlockNumber(),
  addressList: makeSelectAddressList(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadNetwork: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork('Local_RPC'));
    },
    onCheckBalances: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkBalances());
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
