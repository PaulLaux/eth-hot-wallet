/**
*
* SeedView
*
*/

import React from 'react';
// import styled from 'styled-components';
// import { generateKeystore } from 'containers/HomePage/actions';

function SeedView({ loading, error, seed, password, onGenerateKeystore }) {
  if (loading) {
    return <div> Loading....</div>;
  }

  if (error !== false) {
    return <div> Error: {error} </div>;
  }

  if (seed !== false) {
    return (
      <div>
        <br />
        Seed:
        <br />
        {seed}
        <br /><br />
        keystore password:
        <br />
        {password}
        <br />
        <button onClick={onGenerateKeystore} >
          Confirm seed
        </button>
      </div>
    );
  }

  return null;
}

export default SeedView;
