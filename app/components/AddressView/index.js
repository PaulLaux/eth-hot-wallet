/**
*
* AddressView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import AddressList from 'components/AddressList';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressView({ isComfirmed, addressList, onChangeFrom }) {
  if (isComfirmed) {
    return (
      <AddressList items={addressList} onChangeFrom={onChangeFrom} />
    );
  }

  return (
    <div>
      <FormattedMessage {...messages.header} />
      Seed is not confirmed
    </div>);
}

AddressView.propTypes = {
  isComfirmed: PropTypes.bool,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  onChangeFrom: PropTypes.func,
};

export default AddressView;
