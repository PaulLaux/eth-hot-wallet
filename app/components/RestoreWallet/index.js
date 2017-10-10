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

function RestoreWallet({ isShowRestoreWallet, userSeed, onChangeUserSeed, onRestoreWalletFromSeed }) {
  // console.log(isShowRestoreWallet);
  // onSubmit={props.onSubmitForm}
  /*
  <textarea
   placeholder="Enter seed"
   onChange={onChangeUserSeed}
   />
  */
  if (isShowRestoreWallet) {
    return (
      <div>
        <br />
        <FormattedMessage {...messages.header} />
        <form > { /* todo: cancel default action */}
          <label htmlFor="restoreWalletBox">
            <input
              id="restoreWalletBox"
              autoComplete="off"
              type="text"
              placeholder="Enter seed"
              value={userSeed}
              onInput={onChangeUserSeed}
            />
          </label>
          <br />
          <button onClick={onRestoreWalletFromSeed}>
            Restore from seed
          </button>
        </form>
      </div>
    );
  }
  return null;
}

RestoreWallet.propTypes = {
  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
};

export default RestoreWallet;
