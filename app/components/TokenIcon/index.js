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
    font: 22px Impact;
    text-transform: uppercase;
  }
`;

function TokenIcon(props) {
  const { tokenSymbol } = props;

  const iconPath = `token-icons/${tokenSymbol}.png`;

  return (
    <span>
      <Img alt={tokenSymbol} src={iconPath} height="32" />
    </span>
  );
}

TokenIcon.propTypes = {
  tokenSymbol: PropTypes.string,
};

export default TokenIcon;
