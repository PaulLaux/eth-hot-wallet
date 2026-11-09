/**
*
* TokenChooserList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';
import styled from 'styled-components';
import TokenIcon from 'components/TokenIcon';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
`;

const Text = styled.div`
  flex: 1;
  color: rgba(0, 0, 0, 0.45);
`;

function TokenChooserList({ tokenList = [], chosenTokens, onTokenToggle }) {
  return tokenList.map((item) => (
    <Row key={item.symbol}>
      <TokenIcon tokenSymbol={item.symbol} size={32} />
      <Text>
        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name} ({item.symbol.toUpperCase()})</a>
        <div>{item.description}</div>
      </Text>
      <Switch checked={chosenTokens[item.symbol]} onChange={(toggle) => onTokenToggle(item.symbol, toggle)} />
    </Row>
  ));
}

TokenChooserList.propTypes = {
  tokenList: PropTypes.array,
  chosenTokens: PropTypes.object,
  onTokenToggle: PropTypes.func,
};

export default TokenChooserList;
