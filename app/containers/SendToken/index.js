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
import makeSelectSendToken from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function SendToken() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SendToken.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sendtoken: makeSelectSendToken(),
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
