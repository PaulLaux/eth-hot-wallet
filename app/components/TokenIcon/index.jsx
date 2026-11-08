/**
*
* TokenIcon
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  {
    color: #dbd9ff;
    font: 20px Impact;
    text-transform: uppercase;
  }
`;

function TokenIcon({ tokenSymbol, size = 24 }) {
  // const { tokenSymbol } = props;

  const iconPath = `token-icons/${tokenSymbol}.png`;

  return (
    <span>
      <Img alt={tokenSymbol} src={iconPath} height={size.toString()} />
    </span>
  );
}

TokenIcon.propTypes = {
  tokenSymbol: PropTypes.string,
  size: PropTypes.number,
};

export default TokenIcon;
