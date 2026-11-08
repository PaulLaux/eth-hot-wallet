/**
*
* NetworkMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Menu, Button, Dropdown, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
// const MenuDivider = Menu.Divider;

const StyledButton = styled(Button)`
  margin: 15px;
`;

const StyledMenuItem = styled(MenuItem)`
  line-height: 40px;
`;

function NetworkMenu(props) {
  const { networkName, availableNetworks, onLoadNetwork } = props;

  let options;
  if (availableNetworks) {
    options = availableNetworks.map((network) =>
      <StyledMenuItem key={network}><a tabIndex="0" role="button" onClick={() => onLoadNetwork(network)}>{network}</a></StyledMenuItem>
    );
  }

  const menu = (
    <Menu
      forceSubMenuRender
      defaultSelectedKeys={[networkName]}
      selectedKeys={[networkName]}
    >
      <StyledMenuItem disabled key="title">Select ETH network</StyledMenuItem>
      {options}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <StyledButton size="large" icon="wifi">
        {networkName}<Icon type="down" />
      </StyledButton>
    </Dropdown>
  );
}

NetworkMenu.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  networkName: PropTypes.string,
  availableNetworks: PropTypes.object,
};

export default NetworkMenu;
