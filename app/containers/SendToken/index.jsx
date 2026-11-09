/**
 *
 * SendToken
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import SendFrom from 'components/SendFrom';
import SendTo from 'components/SendTo';
import SendAmount from 'components/SendAmount';
import SendTokenSymbol from 'components/SendTokenSymbol';
import SendConfirmationView from 'components/SendConfirmationView';
import SendProgress from 'components/SendProgress';

import { makeSelectAddressList, makeSelectTokenInfoList } from 'containers/HomePage/selectors';
import { makeSelectTxExplorer } from 'containers/Header/selectors';

import {
  changeFrom,
  changeAmount,
  changeTo,
  confirmSendTransaction,
  sendTransaction,
  abortTransaction,
} from './actions';

import {
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectLocked,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectIsSendComfirmationLocked,
  makeSelectSendInProgress,
  makeSelectSendError,
  makeSelectSendTx,
  makeSelectSendTokenSymbol,
} from './selectors';
// import messages from './messages';

function SendToken(props) {
  const {
    isShowSendToken,
    onHideSendToken,

    from,
    to,
    addressList,
    onChangeFrom,
    amount,
    locked,
    onChangeAmount,
    onChangeTo,
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    isSendComfirmationLocked,
    onConfirmSendTransaction,
    onSendTransaction,
    onAbortTransaction,

    sendTokenSymbol,
    tokenInfoList,

    sendInProgress,
    sendError,
    sendTx,

    txExplorer,
    } = props;


  const SendFromProps = { from, addressList, onChangeFrom, locked };
  const SendAmountProps = { amount, onChangeAmount, locked };
  const SendToProps = { to, onChangeTo, locked };

  const SendConfirmationViewProps = {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onSendTransaction,
    onAbortTransaction,
    sendInProgress,
    isSendComfirmationLocked,
    sendError,
  };
  const SendProgressProps = { sendInProgress, sendError, sendTx, txExplorer };

  const SendTokenSymbolProps = { sendTokenSymbol, tokenInfoList, onChangeFrom, locked };

  const modalFooter = [
    <Button key="reset" type="default" size="large" onClick={onAbortTransaction}>
      Reset
    </Button>,
    <Button key="close" type="default" size="large" onClick={onHideSendToken}>
      Close
    </Button>,
  ];

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Modal
        visible={isShowSendToken}
        title="Send Token"
        onOk={onHideSendToken}
        onCancel={onHideSendToken}
        footer={modalFooter}
      >
        <SendFrom {...SendFromProps} /> <br />
        <SendAmount {...SendAmountProps} />
        <SendTokenSymbol {...SendTokenSymbolProps} /><br /> <br />
        <SendTo {...SendToProps} /> <br />
        <Button onClick={onConfirmSendTransaction} disabled={locked} >
          Create transaction
        </Button>
        <SendConfirmationView {...SendConfirmationViewProps} />
        <br />
        <SendProgress {...SendProgressProps} />
      </Modal>
    </div>
  );
}

SendToken.propTypes = {
  onChangeFrom: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  onChangeTo: PropTypes.func.isRequired,
  onConfirmSendTransaction: PropTypes.func.isRequired,
  onSendTransaction: PropTypes.func.isRequired,
  onAbortTransaction: PropTypes.func.isRequired,

  from: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  amount: PropTypes.number,
  sendTokenSymbol: PropTypes.string,
  tokenInfoList: PropTypes.array,

  locked: PropTypes.bool,

  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isSendComfirmationLocked: PropTypes.bool,

  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isShowSendToken: PropTypes.bool,
  onHideSendToken: PropTypes.func,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  txExplorer: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  from: makeSelectFrom(),
  to: makeSelectTo(),
  amount: makeSelectAmount(),
  addressList: makeSelectAddressList(),

  sendTokenSymbol: makeSelectSendTokenSymbol(),
  tokenInfoList: makeSelectTokenInfoList(),

  locked: makeSelectLocked(),

  comfirmationLoading: makeSelectComfirmationLoading(),
  confirmationError: makeSelectConfirmationError(),
  confirmationMsg: makeSelectConfirmationMsg(),

  isSendComfirmationLocked: makeSelectIsSendComfirmationLocked(),

  sendInProgress: makeSelectSendInProgress(),
  sendError: makeSelectSendError(),
  sendTx: makeSelectSendTx(),

  txExplorer: makeSelectTxExplorer(),

});

function mapDispatchToProps(dispatch) {
  return {
    onChangeFrom: (address, sendTokenSymbol) => {
      dispatch(changeFrom(address, sendTokenSymbol));
    },
    onChangeAmount: (amount) => {
      dispatch(changeAmount(amount));
    },
    onChangeTo: (evt) => {
      dispatch(changeTo(evt.target.value));
    },
    onConfirmSendTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmSendTransaction());
    },
    onAbortTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(abortTransaction());
    },
    onSendTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendToken);
