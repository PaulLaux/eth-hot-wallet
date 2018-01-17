/*
 *
 * TokenChooser actions
 *
 */
import {
  TOGGLE_TOKEN,
  CONFIRM_UPDATE_TOKEN_INFO,
} from './constants';
import { TokenSelection } from './token-lists';

/**
 * Changes whether a single token is selected
 * @param {string} symbol 'eth' or 'eos' ...
 * @param  {boolean} toggle
 *
 * @return {object}      An action object with a type of TOGGLE_TOKEN passing the symbol and toggle
 */
export function toggleToken(symbol, toggle) {
  return {
    type: TOGGLE_TOKEN,
    symbol,
    toggle,
  };
}


/**
 * confirm new tokens
 *
 * @param {object} chosenTokens directly from state
 * @param {string} networkName
 *
 * @return {object} An action object with a type of CONFIRM_UPDATE_TOKEN_INFO passing the symbol and toggle
 */
export function confirmNewTokenInfo(chosenTokens, networkName) {
  if (!chosenTokens) {
    return { type: CONFIRM_UPDATE_TOKEN_INFO, tokenInfo: {} };
  }

  const filteredArray = TokenSelection[networkName].filter((x) => chosenTokens[x.symbol]);

  const tokenInfo = filteredArray.reduce((acc, current) => {
    const { symbol, description, ...newObject } = current; // remove symbol,description
    acc[current.symbol] = newObject;
    return acc;
  }, {});

  return {
    type: CONFIRM_UPDATE_TOKEN_INFO,
    tokenInfo,
  };
}
