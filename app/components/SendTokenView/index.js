/**
*
* SendTokenView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';

import SendToken from 'containers/SendToken/Loadable';

// import messages from './messages';

// required to async load the SendToken container once and not removing from dom anymore.
let loadedSendToken = false;

function SendTokenView(props) {
  const { isShowSendToken, onHideSendToken } = props;
  loadedSendToken = isShowSendToken || loadedSendToken;

  if (loadedSendToken) {
    return (
      <SendToken {...props} />
    );
  }
  return (
    null
  );
}

SendTokenView.propTypes = {
  isShowSendToken: PropTypes.bool,
  onHideSendToken: PropTypes.func,
};

export default SendTokenView;
