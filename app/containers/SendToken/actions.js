/*
 *
 * SendToken actions
 *
 */

import {
  CHANGE_AMOUNT,
  CHANGE_FROM,
} from './constants';


export function changeFrom(address) {
  return {
    type: CHANGE_FROM,
    address,
  };
}

export function changeAmount(amount) {
  console.log('action changeAmount');
  return {
    type: CHANGE_AMOUNT,
    amount,
  };
}
