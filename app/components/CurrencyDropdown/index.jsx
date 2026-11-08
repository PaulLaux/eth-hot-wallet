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
  const { exchangeRates, onSelectCurrency, convertTo } = props;

  const convertToSymbol = convertTo.length > 4 ? convertTo.slice(4).toUpperCase() : 'none';

  const convertMenuOptions = [];
  if (exchangeRates) {
    Object.keys(exchangeRates).forEach((currency) => {
      convertMenuOptions.push(<MenuItem key={currency}>{exchangeRates[currency].name}</MenuItem>);
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
        {convertToSymbol === 'none' ? 'Convert' : `${convertToSymbol}`}<Icon type="down" />
      </span>
    </Dropdown>
  );
}

CurrencyDropdown.propTypes = {
  convertTo: PropTypes.string,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
};

export default CurrencyDropdown;
