/**
*
* SendFrom
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function SendFrom({ addressList, from, onChangeFrom }) {
  let options;
  if (addressList && addressList.keySeq().toArray()) {
    // console.log(addressList.keySeq().toArray());

    options = addressList.keySeq().toArray().map((address) =>
      <option value={address} key={address}>0x{address} (500ETH)</option>
    );
  }

  return (
    <div >
      <br />
      Address to send from:<br />
      <label htmlFor="sendFromDropdown">
        <select value={from} onChange={(evt) => onChangeFrom(evt.target.value)}>
          <option value={false}>Select Address</option>
          {options}
        </select>
      </label>
    </div >
  );
}

SendFrom.propTypes = {
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChangeFrom: PropTypes.func,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    // PropTypes.array,
  ]),
};

export default SendFrom;
