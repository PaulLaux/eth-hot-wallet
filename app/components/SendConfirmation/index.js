/**
*
* SendConfirmation
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SendConfirmation() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SendConfirmation.propTypes = {

};

export default SendConfirmation;
