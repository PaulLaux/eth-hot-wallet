/**
*
* NetworkLabel
*
*/

import React from 'react';
// import styled from 'styled-components';

function NetworkLabel(props) {
  const { loading, error, networkName, blockNumber } = props;
  if (loading) {
    return <div> Loading Network</div>;
  }

  if (error !== false) {
    return <div> {error} </div>;
  }

  const networkNameStr = networkName.replace(/_/g, ' ');
  if (networkName !== '') {
    return (
      <div>
        Network Name:{networkNameStr}
        <br />
        blockNumber: {blockNumber}
      </div>
    );
  }

  return null;
}

export default NetworkLabel;
