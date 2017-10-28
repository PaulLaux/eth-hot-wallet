/**
*
* NetworkMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const NetMenu = styled(Menu)`
  line-height: 77px !important;
  border: 0;
  text-align: center;
  z-index: 1 !important;
`;

function NetworkMenu(props) {
  const { networkName, availableNetworks, onLoadNetwork } = props;

  let options;
  if (availableNetworks) {
    options = availableNetworks.map((network) =>
      <Menu.Item key={network}>{network}</Menu.Item>
    );
  }

  return (
    <NetMenu
      mode="horizontal"
      defaultSelectedKeys={[networkName]}
      selectedKeys={[networkName]}
      onClick={(evt) => onLoadNetwork(evt.key)}
    >
      <SubMenu title={networkName} key="1">
        <MenuItemGroup title="Select ETH network">
          {options}
        </MenuItemGroup>
      </SubMenu>
    </NetMenu>
  );
}

NetworkMenu.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  networkName: PropTypes.string,
  availableNetworks: PropTypes.object,
};

export default NetworkMenu;
