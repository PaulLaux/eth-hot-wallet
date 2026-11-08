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
    // generateWalletError,
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
        message={<b>The seed is imposible to recover if lost</b>}
        description={<b>Copy the generated seed to a safe location.<br />
                        HDPathString: m/44'/60'/0'/0.<br /> Recover lost password using the seed.</b>} // eslint-disable-line
        type="warning"
        showIcon
        closable
      />
      <br />
      <Alert
        message="Seed:"
        description={<b>{seed}</b>}
        type="info"
      />
      <br />
      <Alert
        message="Password for browser encryption:"
        description={<b>{password}</b>}
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
  /* generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]), */
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
