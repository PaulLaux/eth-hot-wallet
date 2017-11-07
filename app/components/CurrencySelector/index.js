/**
*
* CurrencySelector
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function CurrencySelector({ convertTo, exchangeRates, onSelectCurrency }) {
  const options = [];
  if (exchangeRates.size > 0) {
    exchangeRates.entrySeq().forEach((entry) => {
      // console.log(`key: ${entry[0]}, value: ${entry[1]}`);
      options.push(<option value={entry[0]} key={entry[0]}>{entry[1].get('name')}</option>);
    });
  }
  /* if (availableNetworks) {
    options = availableNetworks.map((network) =>
      <option value={network} key={network}>{network} </option>
    );
  } */

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <label htmlFor="currencySelectorDropdown">
        <select
          value={convertTo}
          onChange={(evt) => onSelectCurrency(evt.target.value)}
          disabled={false}
        >
          <option value={false}>{'select'} </option>
          {options}
        </select>
      </label>
    </div>
  );
}

CurrencySelector.propTypes = {
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default CurrencySelector;
