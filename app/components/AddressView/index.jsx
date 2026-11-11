/**
*
* AddressView
*
*/

import React from 'react';
import { Spin, Alert } from 'antd';
import styled from 'styled-components';

import AddressTable from 'components/AddressTable';
// import AddressListStatus from 'components/AddressListStatus';
// import CheckBalancesStatus from 'components/CheckBalancesStatus';
import AddressTableFooter from 'components/AddressTableFooter';
import WelcomeText from 'components/WelcomeText';

const Div = styled.div`
  padding: 30px 5px 20px 10px;
  min-height: 100px;
`;

function AddressView(props) {
  const {
    generateKeystoreLoading, generateKeystoreError,
    isComfirmed,
    addressMap, tokenDecimalsMap,
    onShowSendToken, onCheckBalances,
    onGenerateAddress,
    networkReady, checkingBalanceDoneTime, checkingBalances, checkingBalancesError,
    addressListLoading, addressListError, addressListMsg,
    exchangeRates, onSelectCurrency, convertTo,
    onGetExchangeRates,
    getExchangeRatesDoneTime, getExchangeRatesLoading, getExchangeRatesError,
    onShowTokenChooser,
   } = props;

  const addressTableProps = {
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    exchangeRates,
    onSelectCurrency,
    convertTo,
  };

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

    onShowTokenChooser,
  };

  let addressViewContent = (
    <Div>
      {generateKeystoreError ?
        <Alert
          title="Generate Keystore Error"
          description={generateKeystoreError}
          type="error"
          showIcon
        />
        :
        <WelcomeText />}
    </Div>
  );

  if (isComfirmed) {
    addressViewContent = (
      <Div>
        <AddressTable {...addressTableProps} />
        <AddressTableFooter {...addressTableFooterProps} />
      </Div>
    );
  }

  return (
    <Spin
      spinning={generateKeystoreLoading}
      style={{ position: 'static' }}
      size="large"
      description="Loading..."
    >
      {addressViewContent}
    </Spin>
  );
}

export default AddressView;
