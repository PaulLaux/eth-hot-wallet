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

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import SendFrom from 'components/SendFrom';
import SendTo from 'components/SendTo';
import SendAmount from 'components/SendAmount';
import SendGasPrice from 'components/SendGasPrice';
import SendConfirmationView from 'components/SendConfirmationView';
import SendProgress from 'components/SendProgress';

import { makeSelectAddressList } from 'containers/HomePage/selectors';

import { changeFrom, changeAmount, changeTo, changeGasPrice, confirmSendTransaction, sendTransaction } from './actions';
import {
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectGasPrice,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectSendInProgress,
  makeSelectSendError,
  makeSelectSendTx,
} from './selectors';
import reducer from './reducer';
// import saga from './saga';
import messages from './messages';

function SendToken(props) {
  const {
    from,
    to,
    addressList,
    onChangeFrom,
    amount,
    onChangeAmount,
    onChangeTo,
    gasPrice,
    onChangeGasPrice,
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onConfirmSendTransaction,
    onSendTransaction,

    sendInProgress,
    sendError,
    sendTx,
    } = props;

  const SendFromProps = { from, addressList, onChangeFrom };
  const SendAmountProps = { amount, onChangeAmount };
  const SendToProps = { to, onChangeTo };
  const SendGasPriceProps = { gasPrice, onChangeGasPrice };
  const SendConfirmationViewProps = { comfirmationLoading, confirmationError, confirmationMsg, onSendTransaction };
  const SendProgressProps = { sendInProgress, sendError, sendTx };

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <SendFrom {...SendFromProps} /><br />
      <SendAmount {...SendAmountProps} /> <br />
      <SendTo {...SendToProps} /> <br />
      <SendGasPrice {...SendGasPriceProps} />
      <br />
      <button onClick={onConfirmSendTransaction}>
        Create transaction
      </button>
      <SendConfirmationView {...SendConfirmationViewProps} />
      <SendProgress {...SendProgressProps} />
    </div>
  );
}

SendToken.propTypes = {
  onChangeFrom: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  onChangeTo: PropTypes.func.isRequired,
  onChangeGasPrice: PropTypes.func.isRequired,
  onConfirmSendTransaction: PropTypes.func.isRequired,
  onSendTransaction: PropTypes.func.isRequired,

  from: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  amount: PropTypes.number,
  gasPrice: PropTypes.object,

  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

};

const mapStateToProps = createStructuredSelector({
  from: makeSelectFrom(),
  to: makeSelectTo(),
  amount: makeSelectAmount(),
  addressList: makeSelectAddressList(),
  gasPrice: makeSelectGasPrice(),

  comfirmationLoading: makeSelectComfirmationLoading(),
  confirmationError: makeSelectConfirmationError(),
  confirmationMsg: makeSelectConfirmationMsg(),

  sendInProgress: makeSelectSendInProgress(),
  sendError: makeSelectSendError(),
  sendTx: makeSelectSendTx(),

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
    onChangeTo: (evt) => {
      dispatch(changeTo(evt.target.value));
    },
    onChangeGasPrice: (value) => {
      dispatch(changeGasPrice(value));
    },
    onConfirmSendTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmSendTransaction());
    },
    onSendTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sendtoken', reducer });
// const withSaga = injectSaga({ key: 'sendtoken', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(SendToken);
