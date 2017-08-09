/**
*
* AddressItem
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressItem(props) {
  return (
    <div>
      {props.item}

    </div>
  );
}

AddressItem.propTypes = {

};

export default AddressItem;
