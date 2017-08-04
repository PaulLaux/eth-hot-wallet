/**
*
* SeedView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function SeedView({ loading, error, seed, password }) {
  if (loading) {
    return <div> Loading....</div>;
  }

  if (error !== false) {
    return <div> Error!</div>;
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
      </div>
    );
  }


  return null;
}

SeedView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
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
};

export default SeedView;
