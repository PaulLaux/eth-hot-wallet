/**
*
* SubHeader
*
*/

import React from 'react';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
  }
`;

function SubHeader(props) {
  const { onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet } = props;

  const noWalletSubHeader = [
    <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet}>
      New wallet
    </Button>,
    <Button key="restore_wallet" type="default" size="large" onClick={onShowRestoreWallet}>
      Restore wallet
    </Button>,
  ];

  const existingWalletSubHeader = (
    <Popconfirm placement="bottom" title="Comfirm closing wallet" onConfirm={onCloseWallet} okText="Confirm" cancelText="Abort">
      <Button type="default" icon="close-square-o" size="large">
        Close wallet
      </Button>
    </Popconfirm>);


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
};

export default SubHeader;
