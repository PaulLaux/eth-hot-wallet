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

function AddressList({ addressList, onChangeFrom, onCheckBalances }) {
  let mainList = null;

  console.log(addressList);
  if (addressList) {
    mainList = addressList.entrySeq().map(([key, data]) => (
      // if (key ==='lastIndex') return null;
      <AddressItem key={`item-${key}`} address={key} data={data} onChangeFrom={onChangeFrom} />
    ));
  }

  return (
    <div>
      {mainList}
      <br />
    </div>
  );
}

AddressList.propTypes = {
  addressList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChangeFrom: PropTypes.func,
  onCheckBalances: PropTypes.func,
};

export default AddressList;
