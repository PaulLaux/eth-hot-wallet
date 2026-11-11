/**
*
* AddressListStatus
*
*/

import React from 'react';
// import styled from 'styled-components';

function AddressListStatus({ addressListLoading, addressListError, addressListMsg }) {
  if (addressListLoading) {
    return <div> addressListLoading ....</div>;
  }

  if (addressListError !== false) {
    return <div> {addressListError} </div>;
  }

  if (addressListMsg) {
    return (
      <div>
        {addressListMsg}
      </div>
    );
  }
  return null;
}

export default AddressListStatus;
