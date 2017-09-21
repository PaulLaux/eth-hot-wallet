/**
*
* NetworkLabel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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

NetworkLabel.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  networkName: PropTypes.string,
  blockNumber: PropTypes.number,
};

export default NetworkLabel;
