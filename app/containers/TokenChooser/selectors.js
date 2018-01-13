import { createSelector } from 'reselect';

/**
 * Direct selector to the tokenChooser state domain
 */
const selectTokenChooserDomain = (state) => state.get('tokenchooser');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TokenChooser
 */

const makeSelectTokenChooser = () => createSelector(
  selectTokenChooserDomain,
  (substate) => substate.toJS()
);


export {
  selectTokenChooserDomain,

  makeSelectTokenChooser,
};
