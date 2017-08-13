/**
*
* RestoreWallet
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RestoreWallet({ isRestoringWallet }) {
  return (
    <div>
      {isRestoringWallet}
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RestoreWallet.propTypes = {
  isRestoringWallet: PropTypes.bool,
};

export default RestoreWallet;
