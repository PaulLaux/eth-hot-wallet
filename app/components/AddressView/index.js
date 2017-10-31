/**
*
* AddressView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
// import styled from 'styled-components';

import AddressList from 'components/AddressList';
import AddressListStatus from 'components/AddressListStatus';
import CheckBalancesStatus from 'components/CheckBalancesStatus';
import CurrencySelector from 'components/CurrencySelector';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
  const checkBalancesStatusProps = { checkingBalanceDoneTime, checkingBalances, checkingBalancesError };
  const addressListStatusProps = { addressListLoading, addressListError, addressListMsg };

  const currencySelectorProps = { exchangeRates, onSelectCurrency, convertTo };

  if (isComfirmed) {
    return (
      <Spin spinning={generateKeystoreLoading} style={{ position: 'static' }}>
        <div >
          <CurrencySelector {...currencySelectorProps} />
          <AddressList {...addressListProps} />
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
        </div>
      </Spin>
    );
  }

  return (
    <Spin spinning={generateKeystoreLoading} style={{ position: 'static' }}>
      <div style={{ minHeight: 50 }}>
        <FormattedMessage {...messages.header} />
        Seed is not confirmed
    </div>
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
