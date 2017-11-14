/**
*
* SendProgress
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'antd';
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
      <Alert
        message="Error"
        description={sendError}
        type="error"
      />
    );
  }

  if (sendTx) {
    return (
      <Alert
        message="Send sucessfull"
        description={<span> TX: <br /> {sendTx.substring(0, 33)}<br />{sendTx.substring(33)}</span>}
        type="success"
      />
    );
  }

  return null;
}

SendProgress.propTypes = {
  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SendProgress;
