/**
*
* AddressTableFooter
*
*/

import React from 'react';
import styled from 'styled-components';
import { BarsOutlined, GlobalOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';

import IconButton from 'components/IconButton';

const Div = styled.div`
  margin-top: 14px;
  .ant-btn {
    margin-right: 5px;
    margin-top: 15px;
  }
`;

function AddressTableFooter(props) {
  const {
    checkingBalancesError,
    checkingBalances,
    onCheckBalances,
    networkReady,

    isComfirmed,
    onGenerateAddress,
    addressListLoading,
    addressListError,

    onGetExchangeRates,
    getExchangeRatesLoading,
    getExchangeRatesError,

    onShowTokenChooser,
  } = props;

  return (
    <Div>
      <IconButton
        text="Add address"
        icon={<PlusOutlined />}
        onClick={onGenerateAddress}
        loading={addressListLoading}
        error={addressListError}
        disabled={!isComfirmed}
        popconfirmMsg={false}
      />
      <IconButton
        text="Check balances"
        icon={<ReloadOutlined />}
        onClick={onCheckBalances}
        loading={checkingBalances}
        error={checkingBalancesError}
        disabled={!networkReady}
        popconfirmMsg="Refresh balance?"
      />
      <IconButton
        text="Update rates"
        icon={<GlobalOutlined />}
        onClick={onGetExchangeRates}
        loading={getExchangeRatesLoading}
        error={getExchangeRatesError}
        disabled={!networkReady}
        popconfirmMsg="Refresh exchange rates?"
      />
      <br />
      <IconButton
        text="Select Tokens"
        icon={<BarsOutlined />}
        onClick={onShowTokenChooser}
        type="primary"
        // onClick, loading, error, disabled, popconfirmMsg
      />
      <br /><br />
    </Div>
  );
}

export default AddressTableFooter;
