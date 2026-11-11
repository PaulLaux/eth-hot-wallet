/**
*
* NetworkMenu
*
*/

import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'antd';
import { DownOutlined, WifiOutlined } from '@ant-design/icons';

const StyledButton = styled(Button)`
  margin: 15px;
`;

function NetworkMenu(props) {
  const { networkName, availableNetworks = [], onLoadNetwork } = props;

  const menu = {
    items: [
      { key: 'title', label: 'Select ETH network', disabled: true },
      ...availableNetworks.map((network) => ({ key: network, label: network })),
    ],
    selectable: true,
    selectedKeys: [networkName],
    onClick: ({ key }) => onLoadNetwork(key),
  };

  return (
    <Dropdown menu={menu}>
      <StyledButton size="large" icon={<WifiOutlined />}>
        {networkName}<DownOutlined />
      </StyledButton>
    </Dropdown>
  );
}

export default NetworkMenu;
