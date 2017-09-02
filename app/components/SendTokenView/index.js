/**
*
* SendTokenView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import SendToken from 'containers/SendToken/Loadable';

import messages from './messages';


function SendTokenView({ sendToken }) {
  console.log('sendToken: ' + sendToken);
  if (sendToken) {
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
  sendToken: PropTypes.bool,
};

export default SendTokenView;
