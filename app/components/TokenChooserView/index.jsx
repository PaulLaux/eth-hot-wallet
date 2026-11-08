/**
*
* TokenChooserView
*
*/


import React from 'react';
import PropTypes from 'prop-types';

import TokenChooser from 'containers/TokenChooser/Loadable';


// required to async load the TokenChooser container once and keep it
let loadedTokenChooser = false;

function TokenChooserView(props) {
  const {
    isShowTokenChooser,
  } = props;

  loadedTokenChooser = isShowTokenChooser || loadedTokenChooser;

  if (loadedTokenChooser) {
    return <TokenChooser {...props} />;
  }
  return null;
}

TokenChooserView.propTypes = {
  isShowTokenChooser: PropTypes.bool,
};

export default TokenChooserView;
