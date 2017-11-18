/**
*
* AddressTableFooter
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Popconfirm } from 'antd';
import AddressTableFooterErrors from 'components/AddressTableFooterErrors';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const Div = styled.div`
  margin-top: 14px;
  .ant-btn {
    margin-right: 5px;
    margin-top: 15px;
  }
`;


function AddressTableFooter(props) {
  const {
    // checkingBalanceDoneTime,
    checkingBalancesError,
    checkingBalances,
    onCheckBalances,
    networkReady,

    isComfirmed,
    onGenerateAddress,
    addressListLoading,
    addressListError,
    // addressListMsg,

    onGetExchangeRates,
    // getExchangeRatesDoneTime,
    getExchangeRatesLoading,
    getExchangeRatesError,
  } = props;

  const addressTableFooterErrorsProps = { checkingBalancesError, addressListError, getExchangeRatesError };

  return (
    <Div>
      <Button
        size="large"
        type="default"
        icon="plus"
        loading={addressListLoading}
        onClick={onGenerateAddress}
        disabled={!isComfirmed}
      >
        Add address
      </Button>
      <Popconfirm title="Refresh balance?" onConfirm={onCheckBalances} okText="Confirm" cancelText="No">
        <Button
          size="large"
          type="default"
          icon="reload"
          loading={checkingBalances}
          disabled={!networkReady}
        >
          Check balances
        </Button>
      </Popconfirm>
      <Popconfirm title="Refresh exchange rates?" onConfirm={onGetExchangeRates} okText="Confirm" cancelText="No">
        <Button
          size="large"
          type="default"
          icon="global"
          loading={getExchangeRatesLoading}
          disabled={!networkReady}
        >
          Update exchange rates
        </Button>
      </Popconfirm>
      <AddressTableFooterErrors {...addressTableFooterErrorsProps} />
    </Div>
  );
}

AddressTableFooter.propTypes = {
  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  isComfirmed: PropTypes.bool,
  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export default AddressTableFooter;
