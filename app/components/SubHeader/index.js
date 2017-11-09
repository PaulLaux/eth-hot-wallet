/**
*
* SubHeader
*
*/

import React from 'react';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockButton from 'components/LockButton';
const Div = styled.div`
  .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
  }
`;

function SubHeader(props) {
  const {
    onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet,
    onLockWallet, password, onUnlockWallet,
  } = props;

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };

  const noWalletSubHeader = [
    <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet}>
      New wallet
    </Button>,
    <Button key="restore_wallet" type="default" size="large" onClick={onShowRestoreWallet}>
      Restore wallet
    </Button>,
  ];

  const existingWalletSubHeader = [
    <LockButton key="lock_button" {...lockButtonProps} />,
    <Popconfirm key="close_wallet" placement="bottom" title="Comfirm closing wallet" onConfirm={onCloseWallet} okText="Confirm" cancelText="Abort">
      <Button key="close_wallet" type="default" icon="close-square-o" size="large">
        Close wallet
      </Button>
    </Popconfirm>,
  ];


  const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;

  return (
    <Div>
      {subHeader}
    </Div>
  );
}

SubHeader.propTypes = {
  onGenerateWallet: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  isComfirmed: PropTypes.bool,
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
};

export default SubHeader;
