/**
*
* AddressTable
*
*/

import React from 'react';
import styled from 'styled-components';
import { Table, Menu, Dropdown, Icon } from 'antd';
import { Ether } from 'utils/constants';
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

const data = [
  {
    key: '1',
    address: '13cf09054974412ad649b1789301170dad17e9d06',
    balance: '3 ETH',
    convert: '200 USD',
  }, {
    key: '0',
    address: '03cf09054974412ad649b1789301170dad17e9d06',
    balance: '4552.4 ETH',
    convert: '300.44 USD',
  }, {
    key: '2',
    address: '23cf09054974412ad649b1789301170dad17e9d06',
    balance: '4.0 ETH',
    convert: '0.44 USD',
  },
];

const transformList = (listObject, exchangeRates, convertTo) =>
  Object.keys(listObject).map((key) => {
    const origAddressData = listObject[key];
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

/*const convertToMenu = (
  <Menu onClick={(e) => console.log(e)}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);*/

function AddressTable(props) {
  const { addressList, onChangeFrom, onCheckBalances, exchangeRates, convertTo } = props;
  
  const addressArray = transformList(addressList.toJS(), exchangeRates, convertTo);
  // const addressArrayData = addConvertString(addressArray, exchangeRates, convertTo);

  const convertMenuOptions = [];
  if (exchangeRates.size > 0) {
    exchangeRates.entrySeq().forEach((entry) => {
      // console.log(`key: ${entry[0]}, value: ${entry[1]}`);
      convertMenuOptions.push(<Menu.Item key={entry[0]}>{entry[1].get('name')}</Menu.Item>);
    });
  }
  const convertToMenu = (
    <Menu onClick={(e) => console.log(e)}>
      <Menu.Item key={"none"}>None</Menu.Item>
      {convertMenuOptions}
    </Menu>
  );

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
        title={
          <Dropdown overlay={convertToMenu}>
            <span>
              Convert to <Icon type="down" />
            </span>
          </Dropdown>
        }
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
            <a href="#">Show QR</a>
            <span className="ant-divider" />
            <a href="#">Send</a>
          </span>
        )}
      />
    </AddrTable >
  );
}

AddressTable.propTypes = {

};

export default AddressTable;
