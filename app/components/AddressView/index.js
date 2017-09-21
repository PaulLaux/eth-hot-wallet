/**
*
* AddressView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import CheckBalancesStatus from 'components/CheckBalancesStatus';
import AddressList from 'components/AddressList';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressView(props) {
  const { isComfirmed, addressList, onChangeFrom, onCheckBalances, networkReady, checkingBalanceDoneTime, checkingBalances, checkingBalancesError } = props;

  const addressListProps = { addressList, onChangeFrom, onCheckBalances };
  const CheckBalancesStatusProps = { checkingBalanceDoneTime, checkingBalances, checkingBalancesError };

  if (isComfirmed) {
    return (
      <div>
        <AddressList {...addressListProps} />
        <button type="button" onClick={onCheckBalances}>
          Check balances
        </button>
        <br />
        <CheckBalancesStatus {...CheckBalancesStatusProps} />
      </div>
    );
  }

  return (
    <div>
      <FormattedMessage {...messages.header} />
      Seed is not confirmed
    </div>
  );
}

AddressView.propTypes = {
  isComfirmed: PropTypes.bool,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  onChangeFrom: PropTypes.func,
  onCheckBalances: PropTypes.func,
};

export default AddressView;
