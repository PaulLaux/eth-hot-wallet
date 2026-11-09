/**
*
* CheckBalanceStatus
*
*/

import React from 'react';
// import styled from 'styled-components';

function CheckBalancesStatus({ checkingBalanceDoneTime, checkingBalances, checkingBalancesError }) {
  // console.log(checkingBalancesError);
  if (checkingBalances) {
    return <div> checkingBalances ....</div>;
  }

  if (checkingBalancesError !== false) {
    return <div> {checkingBalancesError} </div>;
  }

  const balanceCheckString = checkingBalanceDoneTime ? `balances checked on  + ${checkingBalanceDoneTime}` : 'Balances wasnt checked yet';
  return (
    <div>
      {balanceCheckString}
    </div>
  );
}

export default CheckBalancesStatus;
