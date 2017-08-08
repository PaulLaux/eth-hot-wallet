/**
*
* AddressView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddressView({ isComfirmed, addresses }) {
  const comfirmed = isComfirmed ? 'yes' : 'no';
  const keys = isComfirmed ? addresses : 'no keys yet';
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <br />
      is seed comfirmed: {comfirmed}
      <br />
      list: <br />
      {keys}
    </div>
  );
}

AddressView.propTypes = {
  isComfirmed: PropTypes.bool,
};

export default AddressView;
