/**
 *
 * SendToken
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
import SendFrom from 'components/SendFrom';
import SendTo from 'components/SendTo';

import { makeSelectAddressList } from 'containers/HomePage/selectors'

import { makeSelectFrom, makeSelectTo } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function SendToken(props) {
  const { from, to, addressList } = props;
  const SendFromProps = { from, addressList };
  const SendToProps = { to };
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <SendFrom {...SendFromProps} />
      <SendTo {...SendToProps} />
    </div>
  );
}

SendToken.propTypes = {
  dispatch: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  from: makeSelectFrom(),
  to: makeSelectTo(),
  addressList: makeSelectAddressList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sendtoken', reducer });
const withSaga = injectSaga({ key: 'sendtoken', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SendToken);
