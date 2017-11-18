/**
*
* AddressView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import styled from 'styled-components';

import AddressTable from 'components/AddressTable';
// import AddressListStatus from 'components/AddressListStatus';
// import CheckBalancesStatus from 'components/CheckBalancesStatus';
import AddressTableFooter from 'components/AddressTableFooter';

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
    addressList, onShowSendToken, onCheckBalances,
    onGenerateAddress,
    networkReady, checkingBalanceDoneTime, checkingBalances, checkingBalancesError,
    addressListLoading, addressListError, addressListMsg,
    exchangeRates, onSelectCurrency, convertTo,
    onGetExchangeRates,
    getExchangeRatesDoneTime, getExchangeRatesLoading, getExchangeRatesError,
   } = props;

  const addressTableProps = { addressList, onShowSendToken, exchangeRates, onSelectCurrency, convertTo };
  // const checkBalancesStatusProps = { checkingBalanceDoneTime, checkingBalances, checkingBalancesError };
  // const addressListStatusProps = { addressListLoading, addressListError, addressListMsg };

  const addressTableFooterProps = {
    checkingBalanceDoneTime,
    checkingBalances,
    checkingBalancesError,
    onCheckBalances,
    networkReady,

    isComfirmed,
    onGenerateAddress,
    addressListLoading,
    addressListError,
    addressListMsg,

    onGetExchangeRates,
    getExchangeRatesDoneTime,
    getExchangeRatesLoading,
    getExchangeRatesError,
  };

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
        <Span>Wellcome to ETH Hot Wallet <br />To begin, create or restore wallet</Span>}
    </Div>
  );

  if (isComfirmed) {
    addressViewContent = (
      <Div>
        <AddressTable {...addressTableProps} />

        <AddressTableFooter {...addressTableFooterProps} />
        <br />

        {/*
        <button type="button" onClick={onCheckBalances} disabled={!networkReady}>
          Check balances
        </button>
        <br />
        <CheckBalancesStatus {...checkBalancesStatusProps} />

        <button type="button" onClick={onGenerateAddress}>
          Generate new address
        </button>{' '}
        <AddressListStatus {...addressListStatusProps} /> */}
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
  onShowSendToken: PropTypes.func,

  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export default AddressView;
