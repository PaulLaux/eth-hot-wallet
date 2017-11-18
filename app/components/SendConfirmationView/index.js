/**
*
* SendConfirmationView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Spin } from 'antd';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 22px;
`;

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function SendConfirmationView(props) {
  const {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onSendTransaction,
    onAbortTransaction,
    isSendComfirmationLocked,
    sendError,
       } = props;
  if (comfirmationLoading) {
    return (
      <Div>
        <Spin
          spinning
          style={{ position: 'static' }}
          size="large"
          tip="checking transaction...."
        >
          <br />
        </Spin>
      </Div>
    );
  }

  if (confirmationError !== false) {
    return (
      <Div>
        <Alert
          message="Transaction not created"
          description={confirmationError}
          type="error"
          showIcon
        />
      </Div>
    );
  }

  if (confirmationMsg !== false) {
    return (
      <Div>
        <Alert
          message="Transaction is valid"
          description={confirmationMsg}
          type="info"
        />
        <br />
        <Button icon="to-top" onClick={onSendTransaction} disabled={isSendComfirmationLocked} >
          {sendError ? 'Try again' : 'Send ETH'}
        </Button>
        {' '}
        <Button icon="close" onClick={onAbortTransaction} disabled={isSendComfirmationLocked} >
          Back
        </Button>
      </Div>
    );
  }

  return (
    null
  );
}

SendConfirmationView.propTypes = {
  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isSendComfirmationLocked: PropTypes.bool,

  onSendTransaction: PropTypes.func.isRequired,
  onAbortTransaction: PropTypes.func.isRequired,

  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SendConfirmationView;
