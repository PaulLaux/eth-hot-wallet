/**
*
* CheckBalanceStatus
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function CheckBalanceStatus({ checkingBalances, checkingBalancesError }) {
  // console.log(checkingBalancesError);
  if (checkingBalances) {
    return <div> checkingBalances ....</div>;
  }

  if (checkingBalancesError !== false) {
    return <div> checkingBalancesError: {checkingBalancesError} </div>;
  }

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

CheckBalanceStatus.propTypes = {

};

export default CheckBalanceStatus;
