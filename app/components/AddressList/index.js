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
    content = props.items.entrySeq().map(([key, data]) => (
      <AddressItem key={`item-${key}`} address={key} data={data} />
      //console.log(value)

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
};

export default AddressList;
