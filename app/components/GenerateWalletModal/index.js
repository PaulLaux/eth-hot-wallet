/**
*
* GenerateWalletModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Modal, Button, Alert } from 'antd';

function GenerateWalletModal(props) {
  const {
    isShowGenerateWallet,
    generateWalletLoading,
    generateWalletError,
    seed,
    password,

    onGenerateWallet,
    onGenerateWalletCancel,
    onGenerateKeystore,
    } = props;

  return (
    <Modal
      visible={isShowGenerateWallet}
      title="New Wallet"
      onOk={onGenerateKeystore}
      onCancel={onGenerateWalletCancel}
      footer={[
        <Button key="submit" type="primary" size="large" onClick={onGenerateKeystore}>
          Create
        </Button>,
      ]}
    >
      <Alert
        message="The seed is imposible to recover if lost"
        description="Copy the generated seed to safe location."
        type="warning"
        showIcon
        closable
      />
      <br />
      <Alert
        message="Seed"
        description={seed}
        type="info"
      />
      <br />
      <Alert
        message="In the browser, keystore is encrypted using the password"
        description="Password is required for various actions including send. if password is lost recover the wallet using the seed."
        type="warning"
        showIcon
        closable
      />
      <br />
      <Alert
        message="Password"
        description={password}
        type="info"
      />
      <br />
      <Button shape="circle" icon="reload" loading={generateWalletLoading} key="back" size="large" onClick={onGenerateWallet} />
    </Modal>
  );
}

GenerateWalletModal.propTypes = {
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onGenerateWallet: PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
};

export default GenerateWalletModal;
