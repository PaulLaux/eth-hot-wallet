/**
*
* PageFooter
*
*/

import React from 'react';
// import styled from 'styled-components';
import { StickyFooter } from './sticky';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export const Footer = StickyFooter.extend`
  textAlign: center;
  background: #efeeee;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;
`;

function PageFooter() {
  return (
    <Footer>
      ETH Hot Wallet - <a href="/#">Ethereum open source wallet </a>
    </Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
