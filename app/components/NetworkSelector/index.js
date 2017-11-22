/**
*
* NetworkSelector
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function NetworkSelector({ networkName, availableNetworks, onLoadNetwork }) {
  let options;
  if (availableNetworks) {
    options = availableNetworks.map((network) =>
      <option value={network} key={network}>{network} </option>
    );
  }

  return (
    <div>
      <label htmlFor="networkSelectorDropdown">
        <select
          value={networkName}
          onChange={(evt) => onLoadNetwork(evt.target.value)}
          disabled={false}
        >
          {options}
        </select>
      </label>
    </div>
  );
}

NetworkSelector.propTypes = {
  networkName: PropTypes.string,
  onLoadNetwork: PropTypes.func.isRequired,
  availableNetworks: PropTypes.object,
};

export default NetworkSelector;
