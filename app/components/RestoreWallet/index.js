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

function RestoreWallet({ isShowRestoreWallet }) {
  // console.log(isShowRestoreWallet);
  // onSubmit={props.onSubmitForm}
  if (isShowRestoreWallet) {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <form >
          <label htmlFor="username">
            <input
              id="username"
              type="text"
              placeholder="mxstbr"
              value="66" // {this.props.username}
              // onChange={this.props.onChangeUsername}
            />
          </label>
        </form>
      </div>
    );
  }
  return null;
}

RestoreWallet.propTypes = {
  isShowRestoreWallet: PropTypes.bool,
};

export default RestoreWallet;
