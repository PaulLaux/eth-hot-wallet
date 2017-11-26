/**
*
* CurrencyDropdown
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
// import styled from 'styled-components';
const MenuItem = Menu.Item;

function CurrencyDropdown(props) {
  const { exchangeRates, onSelectCurrency } = props;

  const convertMenuOptions = [];
  if (exchangeRates.size > 0) {
    exchangeRates.entrySeq().forEach((entry) => {
      // `key: ${entry[0]}, value: ${entry[1]}`
      convertMenuOptions.push(<MenuItem key={entry[0]}>{entry[1].get('name')}</MenuItem>);
    });
  }
  const convertToMenu = (
    <Menu onClick={(evt) => onSelectCurrency(evt.key)}>
      <MenuItem key={'none'}>None</MenuItem>
      {convertMenuOptions}
    </Menu>
  );

  return (
    <Dropdown overlay={convertToMenu}>
      <span>
        Convert <Icon type="down" />
      </span>
    </Dropdown>
  );
}

CurrencyDropdown.propTypes = {
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
};

export default CurrencyDropdown;
