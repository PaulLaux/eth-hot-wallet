/**
*
* AddressTableFooter
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressTableFooter(props) {
  const {
    checkingBalanceDoneTime,
    checkingBalancesError,
    checkingBalances,
    onCheckBalances,
    networkReady,

    
  } = props;
  return (
    <div>
      <Button
        size="large"
        type="default"
        icon="reload"
        loading={checkingBalances}
        onClick={onCheckBalances}
        disabled={!networkReady}
      >
        Check Balances
      </Button>

    </div>
  );
}

AddressTableFooter.propTypes = {
  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export default AddressTableFooter;
