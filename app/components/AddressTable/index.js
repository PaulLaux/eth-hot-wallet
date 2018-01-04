/**
*
* AddressTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
// import { Ether } from 'utils/constants';

import CurrencyDropdown from 'components/CurrencyDropdown';

const { Column } = Table;
// import { LocaleProvider } from 'antd';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const AddrTable = styled(Table) `
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  tbody{
    background: white;
  }
`;

/**
 *
 * @param  {addressList} object The address list struct
 * @param  {exchangeRates} object available exchange rates, required for finding selected currency name
 * @param  {convertTo} string the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
tokenList:{
  eth: {
  },
  eos: {
    icon: '',
    name: 'EOS',
    contractAddress: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
    decimals: 18
  },
  ppt: {
    icon: '',
    name: Populous,
    contractAddress: '0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a',
    decimals: 8
  }
}

/*
tokenMap:
{
  index: 1
  eth: {balance: bigNumber / false},
  eos: {balance: bigNumber / false},
  ppt: {balance: bigNumber / false},
}
*/
const splitAddrToRows = (tokenDecimalsMap, tokenMapIN, address, startKey) => {
  let key = startKey;
  const tokenMap = tokenMapIN;
  const index = tokenMap.index;
  delete tokenMap.index;

  return Object.keys(tokenMap).map((token) => {
    const sameAddressRow = {};
    sameAddressRow.index = index;
    sameAddressRow.key = key;
    key += 1;
    sameAddressRow.token = token;
    sameAddressRow.address = address;
    const balance = tokenMap[token].balance;
    const decimals = tokenDecimalsMap[token];
    sameAddressRow.balance = balance ? balance.div((10 ** decimals).toString()).toString(10) : 'n/a';
    sameAddressRow.convert = '';
    return sameAddressRow;
  });
};
/*
{
  key: '1',
  index: '1',
  token: 'eth',
  address: '13c...9d06',
  balance: '3 ETH',
  convert: '200 USD',
} */

const transformList = (addressMap, tokenDecimalsMap, showTokens) => {
  // const showTokens = true;
  let iKey = 1;
  const list = Object.keys(addressMap).map((address) => {
    const tokenMap = addressMap[address];
    const sameAddressList = splitAddrToRows(tokenDecimalsMap, tokenMap, address, iKey);
    /*
      const transform = {};
      const ethBalance = origAddressData.eth.balance;
      const rate = exchangeRates.getIn([convertTo, 'rate']);
      const convertName = exchangeRates.getIn([convertTo, 'name']);
      const convertBalance = (ethBalance && rate) ? ethBalance.div(Ether).times(rate).toFixed(2).toString(10) : '';
      transform.convert = (ethBalance && rate) ? `${convertBalance} ${convertName}` : ''; 
      */

    iKey += sameAddressList.length;
    return sameAddressList;
  });
  return [].concat(...list); // flaten array
};

/**
 * Transforms the immutable struct into Array of data in the form:
 * example for return: addressArray =
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

const addConvertRates = (addressArray, exchangeRates, convertTo) => addressArray;

function AddressTable(props) {
  const { addressMap, tokenDecimalsMap, onShowSendToken, exchangeRates, onSelectCurrency, convertTo } = props;
  const currencyDropdownProps = { exchangeRates, onSelectCurrency };

  const addressArray = transformList(addressMap, tokenDecimalsMap, true);
  const addressArrayConvert = addConvertRates(addressArray, exchangeRates, convertTo);

  return (
    <AddrTable
      dataSource={addressArrayConvert}
      bordered
      scroll={{ x: 400 }}
      pagination={false}
      locale={{
        filterTitle: null,
        filterConfirm: 'Ok',
        filterReset: 'Reset',
        emptyText: 'No Data',
      }}
    >
      <Column
        title="#"
        dataIndex="key"
        key="key"
        width="40px"
        sorter={(a, b) => parseInt(a.key, 10) - parseInt(b.key, 10)}
        sortOrder="ascend"
      />
      <Column
        title="Address"
        dataIndex="address"
        key="address"
        width="270px"
      />
      <Column
        title="Token"
        dataIndex="token"
        key="token"
        width="50px"
      />
      <Column
        title="Balance"
        dataIndex="balance"
        key="balance"
        width="120px"
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
        width="130px"
      />
      <Column
        width="115px"
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            {/* <a href="#" >Show QR</a>
            <span className="ant-divider" /> */}
            {/* eslint-disable */}
            <a onClick={() => onShowSendToken(record.address)}>Send</a>
            {/* eslint-enable */}
          </span>
        )}
      />
    </AddrTable >
  );
}

AddressTable.propTypes = {
  addressMap: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onShowSendToken: PropTypes.func,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default AddressTable;
