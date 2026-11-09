/**
*
* CurrencyDropdown
*
*/

import React from 'react';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function CurrencyDropdown(props) {
  const { exchangeRates = {}, onSelectCurrency, convertTo } = props;

  const convertToSymbol = convertTo.length > 4 ? convertTo.slice(4).toUpperCase() : 'none';

  const menu = {
    items: [
      { key: 'none', label: 'None' },
      ...Object.keys(exchangeRates).map((currency) => ({ key: currency, label: exchangeRates[currency].name })),
    ],
    onClick: ({ key }) => onSelectCurrency(key),
  };

  return (
    <Dropdown menu={menu}>
      <span>
        {convertToSymbol === 'none' ? 'Convert' : `${convertToSymbol}`}<DownOutlined />
      </span>
    </Dropdown>
  );
}

export default CurrencyDropdown;
