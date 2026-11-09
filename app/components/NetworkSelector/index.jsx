/**
*
* NetworkSelector
*
*/

import React from 'react';
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

export default NetworkSelector;
