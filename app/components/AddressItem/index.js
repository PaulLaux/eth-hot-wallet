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
  return (
    <div>
      {props.item.address} | Ballance: {props.item.balance ? props.item.balance : 'n/a' }
    </div>
  );
}

AddressItem.propTypes = {
  item: PropTypes.object,
};

export default AddressItem;
