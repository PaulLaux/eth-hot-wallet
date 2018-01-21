/**
*
* SendTokenView
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import SendToken from 'containers/SendToken/Loadable';


// required to async load the SendToken container once and keeping it
let loadedSendToken = false;

function SendTokenView(props) {
  const {
    isShowSendToken,
  } = props;
  loadedSendToken = isShowSendToken || loadedSendToken;

  if (loadedSendToken) {
    return (
      <SendToken {...props} />
    );
  }
  return null;
}

SendTokenView.propTypes = {
  isShowSendToken: PropTypes.bool,
  // onHideSendToken: PropTypes.func,
};

export default SendTokenView;
