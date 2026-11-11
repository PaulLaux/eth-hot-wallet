import { createSelector } from 'reselect';

/**
 * Direct selector to the tokenChooser state domain
 */
const selectTokenChooserDomain = (state) => state.tokenchooser;

const makeSelectChosenTokens = () => createSelector(
  selectTokenChooserDomain,
  (substate) => substate.chosenTokens
);

export {
  selectTokenChooserDomain,

  makeSelectChosenTokens,
};
