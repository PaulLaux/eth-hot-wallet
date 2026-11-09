/**
*
* SendTransactionView
*
*/

import React from 'react';
// import styled from 'styled-components';

function SendTransactionView({ sendInProgress, sendError, sendTx }) {
  if (sendInProgress) {
    return <div> sending transaction....</div>;
  }

  if (sendError !== false) {
    return <div> Error: {sendError} </div>;
  }

  if (sendTx !== false) {
    return (
      <div>
        Transaction send sucessfully <br />
        TX: {sendTx}
      </div>
    );
  }

  return null;
}

export default SendTransactionView;
