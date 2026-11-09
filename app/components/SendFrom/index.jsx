/**
*
* SendFrom
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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

SendFrom.propTypes = {
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChangeFrom: PropTypes.func,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    // PropTypes.array,
  ]),
  locked: PropTypes.bool,
};

export default SendFrom;
