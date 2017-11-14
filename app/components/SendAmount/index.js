/**
*
* SendAmount
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
//import { FormattedMessage } from 'react-intl';
//import messages from './messages';

function SendAmount({ amount, onChangeAmount, locked }) {
  return (
    <div>
      {'Amount: '}
      <InputNumber
        value={amount}
        min={0}
        step={0.1}
        onChange={(value) => onChangeAmount((value))}
        disabled={locked}
      />
    </div>
  );
}

SendAmount.propTypes = {
  amount: PropTypes.number,
  onChangeAmount: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendAmount;
