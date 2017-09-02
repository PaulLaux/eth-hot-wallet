/**
*
* AddressItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressItem(props) {
  const { address, data, onChangeFrom } = props;
  return (
    <div>
      {address} |
      Balance: {data.get('balance') !== false ? props.data.get('balance').toString(10) : 'n/a'}
      <button onClick={() => onChangeFrom(address)}>
        Send
      </button>
    </div>
  );
}

AddressItem.propTypes = {
  address: PropTypes.string,
  data: PropTypes.object,
};

export default AddressItem;
