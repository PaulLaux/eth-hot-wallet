/**
*
* SendGasPrice
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import BigNumber from 'bignumber.js';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SendGasPrice({ gasPrice, onChangeGasPrice, locked }) {
  const Gwei = '1000000000';
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        min="1"
        max="100"
        step="1"
        disabled={locked}
        value={gasPrice.dividedToIntegerBy(Gwei).toNumber()} // show price in Gwei
        onChange={(evt) => onChangeGasPrice(evt.target.value)} // Bignumber created by reducer
      /> Gwei

    </div>
  );
}

SendGasPrice.propTypes = {
  onChangeGasPrice: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  gasPrice: PropTypes.object,
};

export default SendGasPrice;
