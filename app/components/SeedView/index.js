/**
*
* SeedView
*
*/

import React from 'react';
// import styled from 'styled-components';

function SeedView({ loading, error, seed }) {
  if (loading) {
    return <div> Loading....</div>;
  }

  if (error !== false) {
    return <div> Error!</div>;
  }

  if (seed !== false) {
    return <div> Seed!!</div>;
  }

  return null;
}

SeedView.propTypes = {

};

export default SeedView;
