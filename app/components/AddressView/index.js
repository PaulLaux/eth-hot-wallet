/**
*
* AddressView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import styled from 'styled-components';

import AddressList from 'components/AddressList';
import AddressTable from 'components/AddressTable';
import AddressListStatus from 'components/AddressListStatus';
import CheckBalancesStatus from 'components/CheckBalancesStatus';
import CurrencySelector from 'components/CurrencySelector';

/*
import { FormattedMessage } from 'react-intl';
import messages from './messages';
*/

const Div = styled.div`
  padding: 30px;
  min-height: 100px;
`;

const Span = styled.span`
  font-size: 22px;
`;

function AddressView(props) {
  const {
    generateKeystoreLoading, generateKeystoreError,
    isComfirmed,
    addressList, onChangeFrom, onCheckBalances,
    onGenerateAddress,
    networkReady, checkingBalanceDoneTime, checkingBalances, checkingBalancesError,
    addressListLoading, addressListError, addressListMsg,
    onLockWallet, onUnlockWallet,
    exchangeRates, onSelectCurrency, convertTo,
   } = props;

  const addressListProps = { addressList, onChangeFrom, onCheckBalances, exchangeRates, convertTo };
  const addressTableProps = { addressList, onChangeFrom, onCheckBalances, exchangeRates, convertTo };
  const checkBalancesStatusProps = { checkingBalanceDoneTime, checkingBalances, checkingBalancesError };
  const addressListStatusProps = { addressListLoading, addressListError, addressListMsg };
  const currencySelectorProps = { exchangeRates, onSelectCurrency, convertTo };

  let addressViewContent = (
    <Div>
      {generateKeystoreError ?
        <Alert
          message="Generate Keystore Error"
          description={generateKeystoreError}
          type="error"
          showIcon
        />
        :
        <Span>Wellcome to ETH Hot Wallet <br />To begin create or restore wallet</Span>}
    </Div>
  );

  if (isComfirmed) {
    addressViewContent = (
      <Div>
        <AddressTable {...addressTableProps} />
        <br /> <br />
        {/* <AddressList {...addressListProps} /> */}

        <button type="button" onClick={onCheckBalances} disabled={!networkReady}>
          Check balances
        </button>
        <br />
        <CheckBalancesStatus {...checkBalancesStatusProps} />

        <button type="button" onClick={onGenerateAddress}>
          Generate new address
          </button>{' '}
        <button type="button" onClick={onLockWallet}>
          Lock Wallet
          </button>{' '}
        <button type="button" onClick={onUnlockWallet}>
          Unlock Wallet
          </button>
        <AddressListStatus {...addressListStatusProps} />
        <CurrencySelector {...currencySelectorProps} />
      </Div>
    );
  }

  return (
    <Spin
      spinning={generateKeystoreLoading}
      style={{ position: 'static' }}
      size="large"
      tip="Loading..."
    >
      {addressViewContent}
    </Spin>
  );
}

AddressView.propTypes = {
  generateKeystoreLoading: PropTypes.bool,
  generateKeystoreError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  isComfirmed: PropTypes.bool,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  onChangeFrom: PropTypes.func,
  onCheckBalances: PropTypes.func,
  onGenerateAddress: PropTypes.func,

  onLockWallet: PropTypes.func,
  onUnlockWallet: PropTypes.func,

  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default AddressView;
