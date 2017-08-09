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

function AddressView({ isComfirmed, addresses }) {
  // const comfirmed = isComfirmed ? 'yes' : 'no';
  if (isComfirmed) {
    return (
      <AddressList items={addresses} />
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
  addresses: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default AddressView;
