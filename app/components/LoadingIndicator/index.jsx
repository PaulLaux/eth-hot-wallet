/**
*
* LoadingIndicator
*
*/

import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Div = styled.div`
position: fixed;
top: 50%;
left: 50%;
/* bring your own prefixes */
transform: translate(-50%, -50%);

`;

function LoadingIndicator() {
  return (
    <Div>
      <Spin size="large" tip="ETH Hot Wallet" />
    </Div>
  );
}

LoadingIndicator.propTypes = {

};

export default LoadingIndicator;
