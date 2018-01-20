/**
*
* SendTokenSymbol
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;
// import styled from 'styled-components';


function SendTokenSymbol(props) {
  const { sendTokenSymbol, tokenInfoList, onChangeFrom, locked } = props;

  const optionsList = tokenInfoList.map((token) =>
    <Option key={token} value={token}>{token.toUpperCase()}</Option>
  );

  return (
    <span>
      {' Token: '}
      <Select
        value={sendTokenSymbol}
        style={{ width: 85 }}
        onChange={(tokenSymbol) => onChangeFrom(null, tokenSymbol)}
        disabled={tokenInfoList.length === 1 || locked}
      >
        {optionsList}
      </Select >
    </span>
  );
}

SendTokenSymbol.propTypes = {
  sendTokenSymbol: PropTypes.string,
  tokenInfoList: PropTypes.array,
  onChangeFrom: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendTokenSymbol;
