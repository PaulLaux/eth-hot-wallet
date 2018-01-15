/**
*
* TokenChooserList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import styled from 'styled-components';

/*
tokenList={TokensForNetwork}
selectedTokens={[]}
onTokenToggle={(x) => console.log(x)}
          */
const TokenAvatar = styled(Avatar) `
  span{
    color: black;
    font: 14px Impact;
    text-transform: uppercase;
  }
`;

function TokenChooserList(props) {
  const { tokenList, selectedTokens, onTokenToggle } = props;
  console.log(tokenList);
  return (
    <List
      itemLayout="horizontal"
      dataSource={tokenList}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <TokenAvatar
                shape="square"
                src={`token-icons/${item.symbol}.png`}
                style={{ backgroundColor: '#f1f1f1', verticalAlign: 'middle' }}
              >
                {item.symbol}
              </TokenAvatar>}
            title={<a href="https://ant.design">{item.name}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}

TokenChooserList.propTypes = {
  tokenList: PropTypes.array,
  selectedTokens: PropTypes.array,
  onTokenToggle: PropTypes.func,
};

export default TokenChooserList;
