/**
*
* AddressTableFooter
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
        icon="plus"
        onClick={onGenerateAddress}
        loading={addressListLoading}
        error={addressListError}
        disabled={!isComfirmed}
        popconfirmMsg={false}
      />
      <IconButton
        text="Check balances"
        icon="reload"
        onClick={onCheckBalances}
        loading={checkingBalances}
        error={checkingBalancesError}
        disabled={!networkReady}
        popconfirmMsg="Refresh balance?"
      />
      <IconButton
        text="Update rates"
        icon="global"
        onClick={onGetExchangeRates}
        loading={getExchangeRatesLoading}
        error={getExchangeRatesError}
        disabled={!networkReady}
        popconfirmMsg="Refresh exchange rates?"
      />
      <br />
      <IconButton
        text="Select Tokens"
        icon="bars"
        onClick={onShowTokenChooser}
        type="primary"
        // onClick, loading, error, disabled, popconfirmMsg
      />
      <br /><br />
    </Div>
  );
}

AddressTableFooter.propTypes = {
  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  isComfirmed: PropTypes.bool,
  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onShowTokenChooser: PropTypes.func,
};

export default AddressTableFooter;
