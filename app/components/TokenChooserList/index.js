/**
*
* TokenChooserList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { List, Switch } from 'antd';
import styled from 'styled-components';
import TokenIcon from 'components/TokenIcon';

/*
tokenList={TokensForNetwork}
selectedTokens={[]}
onTokenToggle={(x) => console.log(x)}
*/

const LeftList = styled(List) `
.ant-list-item-meta-content{
  text-align:left;
}
`;

function TokenChooserList(props) {
  const { tokenList, chosenTokens, onTokenToggle } = props;
  return (
    <LeftList
      itemLayout="horizontal"
      dataSource={tokenList}
      renderItem={(item) => (
        <List.Item actions={[<Switch checked={chosenTokens[item.symbol]} onChange={(toggle) => onTokenToggle(item.symbol, toggle)} />]}>
          <List.Item.Meta
            avatar={<TokenIcon tokenSymbol={item.symbol} size={32} />}
            title={<a href={item.url} target="_blank" rel="noopener">{item.name} ({item.symbol.toUpperCase()})</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}

TokenChooserList.propTypes = {
  tokenList: PropTypes.array,
  chosenTokens: PropTypes.object,
  onTokenToggle: PropTypes.func,
};

export default TokenChooserList;
