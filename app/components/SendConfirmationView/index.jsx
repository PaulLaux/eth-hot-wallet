/**
*
* SendConfirmationView
*
*/

import React from 'react';
import { Alert, Button, Spin } from 'antd';
import { CloseOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 22px;
`;


function SendConfirmationView(props) {
  const {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onSendTransaction,
    onAbortTransaction,
    isSendComfirmationLocked,
    sendError,
    sendTokenSymbol,
  } = props;
  if (comfirmationLoading) {
    return (
      <Div>
        <Spin
          spinning
          style={{ position: 'static' }}
          size="large"
          description="checking transaction...."
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
          title="Transaction not created"
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
          title="Transaction is valid"
          description={confirmationMsg}
          type="info"
        />
        <br />
        <Button icon={<VerticalAlignTopOutlined />} onClick={onSendTransaction} disabled={isSendComfirmationLocked} >
          {sendError ? 'Try again' : `Send ${sendTokenSymbol.toUpperCase()}`}
        </Button>
        {' '}
        <Button icon={<CloseOutlined />} onClick={onAbortTransaction} disabled={isSendComfirmationLocked} >
          Back
        </Button>
      </Div>
    );
  }

  return (
    null
  );
}

export default SendConfirmationView;
