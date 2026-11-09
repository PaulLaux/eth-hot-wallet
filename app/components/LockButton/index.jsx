/**
*
* LockButton
*
*/

import React from 'react';
import { Button, Popconfirm } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function LockButton(props) {
  const { onLockWallet, password, onUnlockWallet } = props;

  if (password) {
    return (
      <Popconfirm key="close_wallet" placement="bottom" title="Comfirm locking wallet" onConfirm={onLockWallet} okText="Confirm" cancelText="Abort">
        <Button icon={<LockOutlined />} type="default" size="large" >
          Lock Wallet
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button icon={<UnlockOutlined />} type="default" size="large" onClick={onUnlockWallet}>
      Unlock Wallet
    </Button>
  );
}

export default LockButton;
