/**
*
* RestoreWalletModal
*
*/

import React from 'react';
import styled from 'styled-components';
import { Modal, Button, Input, Tooltip } from 'antd';
import { CloseCircleOutlined, KeyOutlined, WalletOutlined } from '@ant-design/icons';

const Div = styled.div`
  margin-top: 12px;
`;

const Span = styled.span`
  color: red;
  font-size: 21px;
  padding-right: 12px;
  vertical-align: sub;
`;

const Description = styled.div`
  margin-bottom: 10px;
`;

function RestoreWalletModal(props) {
  const { isShowRestoreWallet, userSeed, userPassword, restoreWalletError, onChangeUserSeed, onChangeUserPassword, onRestoreWalletCancel, onRestoreWalletFromSeed } = props;
  const errorComponent =
    (<Span key="error">
      <Tooltip placement="bottom" title={restoreWalletError}>
        <CloseCircleOutlined style={{ color: 'red' }} />
      </Tooltip>
    </Span>);

  return (
    <Modal
      open={isShowRestoreWallet}
      title="Restore Wallet"
      onOk={onRestoreWalletCancel}
      onCancel={onRestoreWalletCancel}
      footer={[
        restoreWalletError ? errorComponent : null,
        <Button key="submit" type="primary" size="large" onClick={onRestoreWalletFromSeed} >
          Restore
        </Button >,
      ]}
    >
      <Description> {"HDPathString m/44'/60'/0'/0 is used for address generation"}</Description>
      <Input
        placeholder="Enter seed"
        prefix={<WalletOutlined />}
        value={userSeed}
        onChange={onChangeUserSeed}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <Div>
        <Input
          placeholder="Enter password for keystore encryption"
          prefix={<KeyOutlined />}
          value={userPassword}
          onChange={onChangeUserPassword}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </Div>
    </Modal>
  );
}

export default RestoreWalletModal;
