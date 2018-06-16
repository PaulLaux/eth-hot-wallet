/**
*
* PageFooter
*
*/

import React from 'react';
import { github } from 'utils/constants';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { StickyFooter } from './sticky';


const Footer = StickyFooter.extend`
  textAlign: center;
  background: #efeeee;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;
`;

const Span = styled.span`
  color: #b9b9b9;
  margin-top:3px;
`;

function PageFooter() {
  return (
    <Footer>
      <Row>
        <Col sm={12} xs={24}>
          {'ETH Hot Wallet - '}
          <a href={github} target="_blank" rel="noopener">
            Ethereum and ERC20 open source wallet (Github)
          </a><br />
          Created using: eth-lightwallet, React.js, Ant design...
        </Col>

        <Span>
          <Col sm={12} xs={24}>
            <a href="https://monetaryCoin.org" target="_blank" rel="noopener">
              MonetaryCoin Homepage
            </a>
            <br />
            <a href="https://monetaryCoin.io" target="_blank" rel="noopener">
              MonetaryCoin Distribution
            </a>
          </Col>
        </Span>

      </Row>
    </Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
