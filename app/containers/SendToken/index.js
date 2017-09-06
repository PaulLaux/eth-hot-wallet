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
import SendAmount from 'components/SendAmount';

import { makeSelectAddressList } from 'containers/HomePage/selectors';

import { changeFrom, changeAmount } from './actions';
import { makeSelectFrom, makeSelectTo, makeSelectAmount } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function SendToken(props) {
  const { from, to, addressList, onChangeFrom, amount, onChangeAmount } = props;

  const SendFromProps = { from, addressList, onChangeFrom };
  const SendToProps = { to };
  const SendAmountProps = { amount, onChangeAmount };

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <SendFrom {...SendFromProps} />
      <SendAmount {...SendAmountProps} />
      <SendTo {...SendToProps} />
    </div>
  );
}

SendToken.propTypes = {
  onChangeFrom: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  amount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  from: makeSelectFrom(),
  to: makeSelectTo(),
  amount: makeSelectAmount(),
  addressList: makeSelectAddressList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeFrom: (address) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(changeFrom(address));
    },
    onChangeAmount: (amount) => {
      dispatch(changeAmount(amount));
    },
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
