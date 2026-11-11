/**
*
* TokenChooserList
*
*/

import React from 'react';
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
  return tokenList.map((item) => {
    const label = `${item.name} (${item.symbol.toUpperCase()})`;
    return (
      <Row key={item.symbol}>
        <TokenIcon tokenSymbol={item.symbol} size={32} />
        <Text>
          {item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{label}</a> : label}
          <div>{item.description}</div>
        </Text>
        <Switch checked={chosenTokens[item.symbol]} onChange={(toggle) => onTokenToggle(item.symbol, toggle)} />
      </Row>
    );
  });
}

export default TokenChooserList;
