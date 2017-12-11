/**
*
* FaucetNotification
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { message, Button, notification } from 'antd';
// import styled from 'styled-components';


function FaucetNotification(props) {
  const {
    checkFaucetLoading,
    checkFaucetSuccess,
    askFaucetLoading,
    askFaucetSuccess,
    askFaucetError,
  } = props;


  return (
    <span></span>
  );
}

FaucetNotification.propTypes = {
  checkFaucetLoading: PropTypes.bool,
  checkFaucetSuccess: PropTypes.bool,
  askFaucetLoading: PropTypes.bool,
  askFaucetSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  askFaucetError: PropTypes.bool,
};

export default FaucetNotification;
