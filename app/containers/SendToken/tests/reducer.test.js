
import { fromJS } from 'immutable';
import sendTokenReducer from '../reducer';

describe('sendTokenReducer', () => {
  it('returns the initial state', () => {
    expect(sendTokenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
