/**
*
* SendProgress
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* import { FormattedMessage } from 'react-intl';
import messages from './messages';
<FormattedMessage {...messages.header} /> */

function SendProgress({ sendInProgress, sendError, sendTx }) {
  if (sendInProgress) {
    return (
      <div>
        Sending..
      </div>
    );
  }

  if (sendError !== false) {
    return (
      <div>
        Error - {sendError}
      </div>
    );
  }

  if (sendTx) {
    return (
      <div>
        Send sucessfull, TX: {sendTx}
      </div>
    );
  }

  return (null);
}

SendProgress.propTypes = {
  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SendProgress;
