/**
*
* AddressTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import { Ether } from 'utils/constants';

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

/*
tokenList:{
  eos: {
    icon: 'https://etherscan.io/token/images/eos_28.png',
    name: 'EOS',
    contractAddress: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
    decimals: 18
  },
  ppt: {
    icon: 'https://etherscan.io/token/images/populous_28.png',
    name: Populous,
    contractAddress: '0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a',
    decimals: 8
  }
}


/*
addressList: {
  address1: {
      order: 1
      eth: {balance: bigNumber},
      eos: {balance: bigNumber},
      ppt: {balance: bigNumber},
    }
} */

/**
 * Transforms the immutable struct into Array of data in the form:
 * example for return:
  [{
    key: '1',
    order: '1',
    address: '13c...9d06',
    balance: '3 ETH',
    convert: '200 USD',
  },{
    key: '2',
    order: '1',
    address: '13c...9d06',
    balance: '3 eos',
    convert: '15 USD',
  }, {
    key: '3',
    order: '1',
    address: '13c...9d06',
    balance: '3 ppt',
    convert: '13 USD',
  },
]

 * order is determined by key
 *
 * @param  {addressList} object The address list struct
 * @param  {exchangeRates} object available exchange rates, required for finding selected currency name
 * @param  {convertTo} string the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const transformList = (addressList, exchangeRates, convertTo) => {
  const addressListJS = addressList.toJS();
  return Object.keys(addressListJS).map((key) => {
    const origAddressData = addressListJS[key];
    const transform = {};

    const ethBalance = origAddressData.eth.balance;

    transform.address = key;
    transform.key = origAddressData.index;
    transform.balance = ethBalance ? `${ethBalance.div(Ether).toString(10)} ETH` : 'n/a';

    const rate = exchangeRates.getIn([convertTo, 'rate']);
    const convertBalance = (ethBalance && rate) ? ethBalance.div(Ether).times(rate).toFixed(2).toString(10) : '';
    const convertName = exchangeRates.getIn([convertTo, 'name']);

    transform.convert = (ethBalance && rate) ? `${convertBalance} ${convertName}` : '';

    return transform;
  });
};

function AddressTable(props) {
  const { addressList, onShowSendToken, exchangeRates, onSelectCurrency, convertTo } = props;

  const currencyDropdownProps = { exchangeRates, onSelectCurrency };

  const addressArray = transformList(addressList, exchangeRates, convertTo);

  return (
    <AddrTable
      dataSource={addressArray}
      bordered
      scroll={{ x: 350 }}
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
        width="250px"
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
  addressList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onShowSendToken: PropTypes.func,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default AddressTable;
