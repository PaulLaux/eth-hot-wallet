/*
 *
 * SendToken actions
 *
 */

import {
  CHANGE_AMOUNT,
  CHANGE_FROM,
  CHANGE_TO,
} from './constants';


export function changeFrom(address) {
  return {
    type: CHANGE_FROM,
    address,
  };
}

export function changeAmount(amount) {
  return {
    type: CHANGE_AMOUNT,
    amount,
  };
}

export function changeTo(address) {
  return {
    type: CHANGE_TO,
    address,
  };
}

