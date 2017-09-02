/*
 *
 * SendToken actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_FROM,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function changeFrom(address) {
  return {
    type: CHANGE_FROM,
    address,
  };
}
