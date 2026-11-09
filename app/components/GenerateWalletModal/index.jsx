/**
*
* GenerateWalletModal
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Modal, Button, Alert } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

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
      open={isShowGenerateWallet}
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
        title={<b>The seed is imposible to recover if lost</b>}
        description={<b>Copy the generated seed to a safe location.<br />
                        HDPathString: m/44'/60'/0'/0.<br /> Recover lost password using the seed.</b>} // eslint-disable-line
        type="warning"
        showIcon
        closable
      />
      <br />
      <Alert
        title="Seed:"
        description={<b>{seed}</b>}
        type="info"
      />
      <br />
      <Alert
        title="Password for browser encryption:"
        description={<b>{password}</b>}
        type="info"
      />
      <br />
      <Button shape="circle" icon={<ReloadOutlined />} loading={generateWalletLoading} key="back" size="large" onClick={onGenerateWallet} />
    </Modal>
  );
}

export default GenerateWalletModal;
