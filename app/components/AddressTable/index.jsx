/**
*
* AddressTable
*
*/

import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { formatUnits } from 'viem';

import CurrencyDropdown from 'components/CurrencyDropdown';
import TokenIcon from 'components/TokenIcon';

const { Column } = Table;

const AddrTable = styled(Table)`
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
  tbody{
    background: white;
  }
  .ant-table{
    font-size: 13px !important;
  }
`;

/**
 * Create list of rows, one row per token for given address
 * @param  {object} tokenDecimalsMap
 * @param  {object} tokenMapIN
 * @param  {string} address current address
 * @param  {number} startKey the first key of the given address
 *
 * @return {object[]} array as rows, one row per token/address
 * row:
{
  key: '1',
  index: '1',
  token: 'eth',
  address: '13c...9d06',
  balance: '3',
  convert: '',
} */
const splitAddrToRows = (tokenDecimalsMap, tokenMapIN, address, startKey) => {
  let key = startKey;
  const { index, ...tokenMap } = tokenMapIN;

  return Object.keys(tokenMap).map((token) => {
    const sameAddressRow = {};
    sameAddressRow.index = index;
    sameAddressRow.key = key;
    key += 1;
    sameAddressRow.token = token;
    sameAddressRow.address = address;
    const balance = tokenMap[token].balance;
    const decimals = tokenDecimalsMap[token];
    sameAddressRow.balance = balance ? formatUnits(BigInt(balance), decimals) : 'n/a';
    // sameAddressRow.convert = '';
    return sameAddressRow;
  });
};

/**
 * Transforms addressMap into Array of rows
 * @param  {object} addressMap
 * @param  {object} tokenDecimalsMap number of decimal for each currency
 * @param  {boolean} showTokens should show token in the table
 * return example: addressArray =
  [{{
    key: '1',
    index: '1',
    token: 'eth',
    address: '13c...9d06',
    balance: '3',
    convert: '200 USD',
  },
    key: '2',
    index: '1',
    token: 'eos',
    address: '13c...9d06',
    balance: '3',
    convert: '15 USD',
  }, {
    key: '3',
    index: '1',
    token: 'ppt',
    address: '13c...9d06',
    balance: '3',
    convert: '13 USD',
  },
] */
const transformList = (addressMap, tokenDecimalsMap, showTokens) => { //eslint-disable-line
  // const showTokens = true;
  let iKey = 1;
  const list = Object.keys(addressMap).map((address) => {
    const tokenMap = addressMap[address];
    const sameAddressList = splitAddrToRows(tokenDecimalsMap, tokenMap, address, iKey);

    iKey += sameAddressList.length;
    return sameAddressList;
  });
  return [].concat(...list); // flaten array
};

/**
 * return conversion rate from given token: token to eth by invert(eth_token), then eth to target
 * @param  {object} exchangeRates available exchange rates
 * @param  {string} from symbol to convert from: 'eth' / 'usd' / ..
 * @param  {string} to the convertion pair to use: ie "eth_usd"
 *
 * @return {number} conversion rate
 */
const getConvertRate = (exchangeRates, from, to) => exchangeRates[to].rate / exchangeRates[`eth_${from}`].rate;

/**
 * Add converted rates to all rows
 * adds nothing if exchange rate not found
 * @param  {object[]} rowList table rows contains balance
 * @param  {object} exchangeRates all available exchange rates
 * @param  {string} convertTo the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const addConvertRates = (rowList, exchangeRates, convertTo) =>
  rowList.map((row) => {
    try {
      // const convertToSymbol = convertTo.slice(4).toUpperCase();
      if (`eth_${row.token}` === convertTo) {
        row.convert = row.balance;
      } else {
        const value = getConvertRate(exchangeRates, row.token, convertTo) * row.balance;
        if (Number.isFinite(value)) row.convert = String(+value.toFixed(5));
      }
      return row;
    } catch {
      // no rates found
      return row;
    }
  });

function AddressTable(props) {
  const {
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    exchangeRates,
    onSelectCurrency,
    convertTo,
  } = props;

  const currencyDropdownProps = { exchangeRates, onSelectCurrency, convertTo };

  const rowList = transformList(addressMap, tokenDecimalsMap, true);
  const completeRowList = addConvertRates(rowList, exchangeRates, convertTo);

  return (
    <AddrTable
      dataSource={completeRowList}
      bordered
      scroll={{ x: 'max-content' }}
      pagination={false}
      locale={{
        filterTitle: null,
        filterConfirm: 'Ok',
        filterReset: 'Reset',
        emptyText: 'No Data',
      }}

    >
      <Column
        title="Address"
        dataIndex="address"
        key="address"
        width="250px"
        align="center"
        onCell={(record) => ({ rowSpan: record.token === 'eth' ? Object.keys(tokenDecimalsMap).length || 2 : 0 })}
      />
      {/* <Column
        title="#"
        dataIndex="key"
        key="key"
        width="10px"
        sorter={(a, b) => parseInt(a.key, 10) - parseInt(b.key, 10)}
        sortOrder="ascend"
        align="center"
      /> */}
      <Column
        title="Icon"
        key="Icon"
        width="50px"
        render={(text, record) => (
          <TokenIcon tokenSymbol={record.token} />
        )}
        align="center"
      />

      <Column
        title="Token"
        dataIndex="token"
        key="token"
        width="65px"
        align="center"
        render={(text, record) => (
          record.token.toUpperCase()
        )}
      />
      <Column
        title="Balance"
        dataIndex="balance"
        key="balance"
        width="80px"
        filters={[{
          text: 'Remove empty',
          value: '0 ETH',
        }]}
        onFilter={(value, record) => record.balance !== value}
      />
      <Column
        title={<CurrencyDropdown {...currencyDropdownProps} />}
        dataIndex="convert"
        key="convert"
        width="80px"
      />
      <Column
        width="65px"
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            {/* <a href="#" >Show QR</a>
            <span className="ant-divider" /> */}
            <a onClick={() => onShowSendToken(record.address, record.token)}>Send</a>
          </span>
        )}
      />
    </AddrTable >
  );
}

export default AddressTable;
