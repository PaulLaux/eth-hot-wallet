/**
*
* SendFrom
*
*/

import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

// import styled from 'styled-components';

function SendFrom({ addressList, from, onChangeFrom, locked }) {
  // let options;
  let selectOptions;
  if (addressList) {
    selectOptions = Object.keys(addressList).map((address) =>
      <Option value={address} key={address}>{address}</Option>
    );
  }

  return (
    <div>
      Source:<br />
      <Select value={from} style={{ width: 300 }} onChange={onChangeFrom} disabled={locked}>
        {selectOptions}
      </Select>
    </div >
  );
}

export default SendFrom;
