import { createSelector } from 'reselect';

/**
 * Direct selector to the tokenChooser state domain
 */
const selectTokenChooserDomain = (state) => state.get('tokenchooser');

const makeSelectChosenTokens = () => createSelector(
  selectTokenChooserDomain,
  (substate) => substate.get('chosenTokens').toJS()
);

export {
  selectTokenChooserDomain,

  makeSelectChosenTokens,
};
