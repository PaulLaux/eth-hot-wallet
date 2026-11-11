/**
*
* AddressTable
*
*/

import React from 'react';
import styled from 'styled-components';
import { Table, Grid, Typography } from 'antd';
import { formatUnits } from 'viem';

import CurrencyDropdown from 'components/CurrencyDropdown';
import TokenIcon from 'components/TokenIcon';

const { Column } = Table;
const { Text } = Typography;

const shortAddress = (address) => `${address.slice(0, 6)}…${address.slice(-4)}`;

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
    // formatUnits would silently mis-scale the balance without a decimals count
    sameAddressRow.balance = balance && Number.isInteger(decimals) ? formatUnits(BigInt(balance), decimals) : 'n/a';
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
export const transformList = (addressMap, tokenDecimalsMap, showTokens) => { //eslint-disable-line
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
export const addConvertRates = (rowList, exchangeRates, convertTo) =>
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
  const narrow = !Grid.useBreakpoint().md; // phones: compact cells, short addresses
  const tightCell = () => ({ style: { paddingInline: narrow ? 4 : 8 } }); // token icon and name

  const rowList = transformList(addressMap, tokenDecimalsMap, true);
  const completeRowList = addConvertRates(rowList, exchangeRates, convertTo);

  return (
    <AddrTable
      dataSource={completeRowList}
      bordered
      size={narrow ? 'small' : undefined}
      scroll={{ x: 'max-content' }}
      pagination={false}
      locale={{ emptyText: 'No Data' }}
    >
      <Column
        title="Address"
        dataIndex="address"
        key="address"
        align="center"
        onCell={(record) => ({ rowSpan: record.token === 'eth' ? Object.keys(tokenDecimalsMap).length || 2 : 0 })}
        render={(address) => <Text copyable={{ text: address }}>{narrow ? shortAddress(address) : address}</Text>}
      />
      <Column
        key="icon" // no title: antd's scroll.x keeps every column as wide as its title
        align="center"
        onCell={tightCell}
        render={(text, record) => <TokenIcon tokenSymbol={record.token} size={20} />}
      />
      <Column
        title="Token"
        dataIndex="token"
        key="token"
        align="center"
        onCell={tightCell}
        render={(token) => token.toUpperCase()}
      />
      <Column
        title={<>Balance<br /><CurrencyDropdown {...currencyDropdownProps} /></>}
        dataIndex="balance"
        key="balance"
        align="center"
        render={(balance, record) => <>{balance}<br /><Text type="secondary">{record.convert}</Text></>}
      />
      <Column
        key="action"
        render={(text, record) => (
          <a onClick={() => onShowSendToken(record.address, record.token)}>Send</a>
        )}
      />
    </AddrTable >
  );
}

export default AddressTable;
