/**
*
* TxLink
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import util from 'util';

const Span = styled.span`
overflow-wrap: break-word;
`;

function TxLink(props) {
  const { tx, explorer } = props;
  if (explorer) {
    // return (
    //   <a href={`${util.format(explorer, tx)}`} target="_blank" rel="noopener">
    //     <Span>{tx}</Span>
    //   </a>
    // );
    return (
      <a href={`${explorer}${tx}`} target="_blank" rel="noopener">
        <Span>{tx}</Span>
      </a>
    );
  }
  return (<Span>{tx}</Span>);
}

TxLink.propTypes = {
  tx: PropTypes.string,
  explorer: PropTypes.string,
};

export default TxLink;
