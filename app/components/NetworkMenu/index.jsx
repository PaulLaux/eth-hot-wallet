/**
*
* NetworkMenu
*
*/

import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'antd';
import { DownOutlined, WifiOutlined } from '@ant-design/icons';
import Network from 'containers/Header/network';

const StyledButton = styled(Button)`
  margin: 15px;
`;

function NetworkMenu(props) {
  const { networkName, availableNetworks = [], onLoadNetwork } = props;

  const groups = [...new Set(availableNetworks.map((name) => Network[name].group))];
  const menu = {
    items: groups.map((group) => ({
      type: 'group',
      key: group,
      label: group,
      children: availableNetworks.filter((name) => Network[name].group === group).map((name) => ({ key: name, label: name })),
    })),
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
