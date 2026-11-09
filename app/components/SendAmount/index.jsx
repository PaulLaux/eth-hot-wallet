/**
*
* SendAmount
*
*/

import React from 'react';
// import styled from 'styled-components';
import { InputNumber } from 'antd';

function SendAmount({ amount, onChangeAmount, locked }) {
  return (
    <span>
      {'Amount: '}
      <InputNumber
        value={amount}
        min={0}
        step={0.1}
        onChange={(value) => onChangeAmount((value))}
        disabled={locked}
      />
    </span>
  );
}

export default SendAmount;
