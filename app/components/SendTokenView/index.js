/**
*
* SendTokenView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import SendToken from 'containers/SendToken';

import messages from './messages';


function SendTokenView({ showSendToken }) {
  if (showSendToken) {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <SendToken />
      </div>
    );
  }
  return (
    null
  );
}

SendTokenView.propTypes = {
  showSendToken: PropTypes.bool,
};

export default SendTokenView;
