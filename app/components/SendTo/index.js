/**
*
* SendTo
*
*/

import React from 'react';
// import styled from 'styled-components';


function SendTo({ to, onChangeTo }) {
  const inputStyle = {
    minWidth: 370,
  };

  return (
    <div>
      Send to address: <br />
      <label htmlFor="sendToBox">
        <input
          style={inputStyle}
          id="sendToBox"
          type="text"
          placeholder="Enter destenation address"
          value={to}
          onInput={onChangeTo}
        />
      </label>
    </div>
  );
}

SendTo.propTypes = {

};

export default SendTo;
