/*
 *
 * TokenChooser reducer
 *
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_TOKEN,
} from './constants';

const initialState = {

  chosenTokens: { mero: true },

};

export default createReducer(initialState, (builder) => builder
  .addCase(TOGGLE_TOKEN, (s, a) => { s.chosenTokens[a.symbol] = a.toggle; }));
