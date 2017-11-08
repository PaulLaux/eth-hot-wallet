/**
*
* CurrencyDropdown
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
// import styled from 'styled-components';


function CurrencyDropdown(props) {
  const { exchangeRates, onSelectCurrency } = props;

  const convertMenuOptions = [];
  if (exchangeRates.size > 0) {
    exchangeRates.entrySeq().forEach((entry) => {
      // `key: ${entry[0]}, value: ${entry[1]}`
      convertMenuOptions.push(<Menu.Item key={entry[0]}>{entry[1].get('name')}</Menu.Item>);
    });
  }
  const convertToMenu = (
    <Menu onClick={(evt) => onSelectCurrency(evt.key)}>
      <Menu.Item key={'none'}>None</Menu.Item>
      {convertMenuOptions}
    </Menu>
  );

  return (
    <Dropdown overlay={convertToMenu}>
      <span>
        Convert to <Icon type="down" />
      </span>
    </Dropdown>
  );
}

CurrencyDropdown.propTypes = {
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
};

export default CurrencyDropdown;
