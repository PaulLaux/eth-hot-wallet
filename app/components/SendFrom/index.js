/**
*
* SendFrom
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function SendFrom({ addressList, from }) {
  if (addressList && addressList.entrySeq()) {
    console.log(addressList.entrySeq());
  }

  return (
    <div >
      from {from}
      <br />
      addressList: 
    </div >
  );
}

SendFrom.propTypes = {
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default SendFrom;
