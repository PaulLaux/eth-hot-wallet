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

function AddressList({ items, onChangeFrom }) {
  let content = (<div></div>);
  // const onChangeFrom = props.on
  if (items) {
    content = items.entrySeq().map(([key, data]) => (
      <AddressItem key={`item-${key}`} address={key} data={data} onChangeFrom={onChangeFrom} />
    ));
  }

  return (
    <div>
      {content}
      {content.type}
    </div>
  );
}

AddressList.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    // PropTypes.array,
  ]),
  onChangeFrom: PropTypes.func,
};

export default AddressList;
