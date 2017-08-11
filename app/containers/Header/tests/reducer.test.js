
import { fromJS } from 'immutable';
import headerReducer from '../reducer';

describe('headerReducer', () => {
  it('returns the initial state', () => {
    expect(headerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
