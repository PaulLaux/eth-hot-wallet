
import { fromJS } from 'immutable';
import tokenChooserReducer from '../reducer';

describe('tokenChooserReducer', () => {
  it('returns the initial state', () => {
    expect(tokenChooserReducer(undefined, {})).toEqual(fromJS({}));
  });
});
