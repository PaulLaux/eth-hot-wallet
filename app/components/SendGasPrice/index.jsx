/**
*
* SendGasPrice
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Row, Col } from 'antd';
// import { Gwei } from 'utils/constants';
// import BigNumber from 'bignumber.js';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function SendGasPrice({ gasPrice, onChangeGasPrice, locked }) {
  return (
    <div>
      {'Gas price (Gwei):'}
      <Row type="flex" justify="center">
        <Col span={12}>
          <Slider
            min={0.5}
            max={100}
            step={0.1}
            onChange={onChangeGasPrice} // Bignumber created by reducer
            value={gasPrice}
            disabled={locked}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0.5}
            max={100}
            step={0.1}
            style={{ marginLeft: 16 }}
            value={gasPrice}
            onChange={onChangeGasPrice} // Bignumber created by reducer
            disabled={locked}
          />
        </Col>
      </Row>
    </div>
  );
}

SendGasPrice.propTypes = {
  onChangeGasPrice: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  gasPrice: PropTypes.number,
};

export default SendGasPrice;
