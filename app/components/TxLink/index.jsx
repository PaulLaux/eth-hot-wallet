/**
*
* TxLink
*
*/

import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
overflow-wrap: break-word;
`;

function TxLink(props) {
  const { tx, explorer } = props;
  if (explorer) {
    return (
      <a href={`${explorer}${tx}`} target="_blank" rel="noopener noreferrer">
        <Span>{tx}</Span>
      </a>
    );
  }
  return (<Span>{tx}</Span>);
}

export default TxLink;
