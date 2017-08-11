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

import NetworkLabel from 'components/NetworkLabel';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
  makeSelectBlockNumber,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNetwork } from './actions';


function Header(props) {
  const { loading, error, networkName, blockNumber } = props;
  const networkLabelProps = {
    loading,
    error,
    networkName,
    blockNumber,
  };

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <NetworkLabel {...networkLabelProps} />
      <br />
      <button onClick={props.onLoadNetwork}>
          Load Network
        </button>
      <hr />
    </div>
  );
}

Header.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  networkName: PropTypes.string,
  blockNumber: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  // header: makeSelectHeader(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  networkName: makeSelectNetworkName(),
  blockNumber: makeSelectBlockNumber(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadNetwork: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork('local'));
    },
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
