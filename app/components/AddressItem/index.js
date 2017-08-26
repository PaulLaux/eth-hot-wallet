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
  const { address, data } = props;
  return (
    <div>
      {address} | Ballance: {data.get('balance') ? props.data.get('balance') : 'n/a'}
    </div>
  );
}

AddressItem.propTypes = {
  address: PropTypes.string,
  data: PropTypes.object,
};

export default AddressItem;
