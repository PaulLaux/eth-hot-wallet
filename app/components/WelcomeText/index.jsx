/**
*
* WelcomeText
*
*/

import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 22px;
  color: rgba(0, 0, 0, 0.55);
  font-weight: 400;
`;

const H2 = styled.h2`
font-size: 16px;
margin-top:30px;
color: #b9b9b9;
font-weight: 400;
`;

function WelcomeText() {
  return (
    <div>
      <H1>Welcome to ETH Hot Wallet <br />To begin, create or restore a wallet for Ethereum, Base, Arbitrum or Optimism</H1>
      <H2>
        Send ETH and ERC-20 tokens without a browser extension. Keys are generated and used for signing inside the browser and never sent. <br />
        The seed is stored encrypted with your password. When the wallet is locked, you can only view balances.
      </H2>
    </div>
  );
}

WelcomeText.propTypes = {

};

export default WelcomeText;
