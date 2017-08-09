/**
*
* AddressList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import AddressItem from 'components/AddressItem';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressList(props) {
  let content = (<div></div>);

  if (props.items) {
    content = props.items.map((item) => (
      <AddressItem key={`item-${item}`} item={item} />
    ));
  }

  return (
    <div>
      { content }
      {content.type}
    </div>
  );
}

AddressList.propTypes = {
  items: PropTypes.array,
};

export default AddressList;
