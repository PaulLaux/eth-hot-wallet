/**
*
* PageFooter
*
*/

import React from 'react';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const StickyFooter = styled.div`
  textAlign: center;
  background: #f3f3f3;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;

`;

function PageFooter() {
  return (
    <StickyFooter>
      ETH Hot Wallet - Ethereum open source wallet
    </StickyFooter>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
