/**
*
* SendConfirmationView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SendConfirmationView({ comfirmationLoading, confirmationError, confirmationMsg }) {
  if (comfirmationLoading) {
    return <div> checking transaction....</div>;
  }

  if (confirmationError !== false) {
    return <div> Error: {confirmationError} </div>;
  }

  if (confirmationMsg !== false) {
    return (
      <div>
        transaction is valid: {confirmationMsg} <br />
        <button onClick={() => console.log('send transaction')} >
          Send ETH
        </button>

      </div>
    );
  }

  return (
    null
  );
}

SendConfirmationView.propTypes = {
  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SendConfirmationView;
