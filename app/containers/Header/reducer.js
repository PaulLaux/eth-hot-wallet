/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_NETWORK,
  LOAD_NETWORK_SUCCESS,
  LOAD_NETWORK_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  networkName: '',
  blockNumber: 0,

  loading: false,
  error: false,

});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NETWORK:
      return state
        .set('loading', true)
        .set('error', false)
        .set('networkName', action.networkName);
    case LOAD_NETWORK_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('blockNumber', action.blockNumber);
    case LOAD_NETWORK_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default headerReducer;
