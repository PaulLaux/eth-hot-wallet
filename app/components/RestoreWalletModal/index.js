/**
*
* RestoreWalletModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button, Input, Icon, Tooltip } from 'antd';

const Div = styled.div`
  margin-top: 12px;
`;

const Span = styled.span`
  color: red;
  font-size: 21px;
  padding-right: 12px;
  vertical-align: sub;
`;
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function RestoreWalletModal(props) {
  const { isShowRestoreWallet, userSeed, userPassword, restoreWalletError, onChangeUserSeed, onChangeUserPassword, onRestoreWalletCancel, onRestoreWalletFromSeed } = props;
  // const suffix = userSeed ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
  const errorComponent =
    (<Span key="error">
      <Tooltip placement="bottom" title={restoreWalletError}>
        <Icon type="close-circle-o" style={{ color: 'red' }} />
      </Tooltip>
    </Span>);

  return (
    <Modal
      visible={isShowRestoreWallet}
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
      <Input
        placeholder="Enter seed"
        prefix={<Icon type="wallet" />}
        value={userSeed}
        onChange={onChangeUserSeed}
      />
      <Div>
        <Input
          placeholder="Enter keystore password"
          prefix={<Icon type="key" />}
          value={userPassword}
          onChange={onChangeUserPassword}
        />
      </Div>

    </Modal>
  );
}

RestoreWalletModal.propTypes = {
  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  userPassword: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeUserPassword: PropTypes.func,
  restoreWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onRestoreWalletCancel: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
};

export default RestoreWalletModal;
