/**
*
* RestoreWallet
*
*/

import React from 'react';
// import styled from 'styled-components';

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
        <form > { /* todo: cancel default action */}
          <label htmlFor="restoreWalletBox">
            <input
              id="restoreWalletBox"
              type="text"
              placeholder="Enter seed"
              value={userSeed}
              onInput={onChangeUserSeed}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
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

export default RestoreWallet;
