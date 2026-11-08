/**
*
* SendTransactionView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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

SendTransactionView.propTypes = {
  sendInProgress: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sendTx: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default SendTransactionView;
