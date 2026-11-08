/**
*
* SeedView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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

SeedView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onGenerateKeystore: PropTypes.func,
};


export default SeedView;
