/**
*
* GenerateWalletModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Modal, Button } from 'antd';

function GenerateWalletModal(props) {
  const { isShowGenerateWallet, generateWalletLoading, generateWalletError, seed, password, onGenerateWallet, onGenerateWalletCancel, onGenerateKeystore } = props;

  return (
    <Modal
      visible={isShowGenerateWallet}
      title="Generate New Wallet"
      onOk={onGenerateWalletCancel}
      onCancel={onGenerateWalletCancel}
      footer={[
        <Button key="back" size="large" onClick={onGenerateWalletCancel}>
          Return
        </Button>,

        <Button key="submit" type="primary" size="large" onClick={onGenerateWalletCancel}>
          Submit
        </Button>,
      ]}
    >
      <p>{seed}</p>
      <p>{password}</p>
      <Button key="back" size="large" onClick={onGenerateWallet}>
          Regenerate
      </Button>
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
