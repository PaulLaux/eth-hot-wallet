/**
*
* PageFooter
*
*/

import React from 'react';
import { github } from 'utils/constants';
import { StickyFooter } from './sticky';


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
      {'ETH Hot Wallet - '}
      <a href={github} target="_blank">
        Ethereum open source wallet
      </a>
    </Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
