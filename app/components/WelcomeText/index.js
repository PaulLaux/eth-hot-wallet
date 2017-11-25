/**
*
* WelcomeText
*
*/

import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
font-size: 22px;
`;

const Description = styled.div`
font-size: 16px;
margin-top:30px;
color: #b9b9b9;
`;

function WelcomeText() {
  return (
    <div>
      <Span>Welcome to ETH Hot Wallet <br />To begin, create or restore wallet<br /></Span>
      <Description>
        ETH Hot wallet is a zero client. Conection to Ethereum network is done via infura / local node. <br />
        Keystore is encrypted using the password, When the wallet is locked you can only view balances.<br />
        All keys are saved inside the browser and never sent.
      </Description>
    </div>
  );
}

WelcomeText.propTypes = {

};

export default WelcomeText;
