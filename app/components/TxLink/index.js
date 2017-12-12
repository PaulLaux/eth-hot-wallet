/**
*
* TxLink
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Span = styled.span`
overflow-wrap: break-word;
`;

function TxLink(props) {
  const { tx, explorer } = props;
  return (
    <a href={`${explorer}/${tx}`} target="_blank" rel="noopener">
      <Span>{tx}</Span>
    </a>
  );
}

TxLink.propTypes = {
  tx: PropTypes.string,
  explorer: PropTypes.string,
};

export default TxLink;
