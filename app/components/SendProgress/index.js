/**
*
* SendProgress
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';
// import styled from 'styled-components';


function SendProgress({ sendInProgress, sendError, sendTx }) {
  if (sendInProgress) {
    return (
      <Spin
        spinning
        style={{ position: 'static' }}
        size="large"
        tip="Sending..."
      >
        <br /><br />
      </Spin>

    );
  }

  if (sendError !== false) {
    return (
      <Alert
        message="Send Error"
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
