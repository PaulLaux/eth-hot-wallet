/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  INIT_SEED,
  INIT_SEED_SUCCESS,
  INIT_SEED_ERROR,
  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR,
  SHOW_RESTORE_WALLET,
} from './constants';

// import lightwallet from 'eth-lightwallet';

/**
 * Init seed - this action starts the * saga
 *
 * @return {object}    An action object with a type of INIT_WALLET
 */
export function initSeed() {
  return {
    type: INIT_SEED,
  };
}
/**
 * Dispatched when the wallet initiation is done by the initSeed saga
 *
 * @param  {string} seed
 * @param  {string} password The current username
 *
 * @return {object}      An action object with a type of INIT_WALLET_SUCCESS passing the repos
 */
export function seedInitilized(seed, password) {
  return {
    type: INIT_SEED_SUCCESS,
    seed,
    password,
  };
}
/**
 * Dispatched when generating the wallet fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of INIT_WALLET_ERROR passing the error
 */
export function initSeedError(error) {
  return {
    type: INIT_SEED_ERROR,
    error,
  };
}

/** ****************** Restore wallet *************** */

/**
 * Show the restore wallet component
 *
 * @return {object}    An action object with a type of SHOW_RESTORE_WALLET
 */
export function showRestoreWallet() {
  return {
    type: SHOW_RESTORE_WALLET,
  };
}

/** ******** Confirm seed and generate keystore *********** **/

/**
 * Confirm seed and create new keystore
 *
 * @return {object}    An action object with a type of GENERATE_KEYSTORE
 */
export function generateKeystore() {
  return {
    type: GENERATE_KEYSTORE,
  };
}
/**
 * Dispatched when the wallet initiation is done by the init_wallet saga
 *
 * @param  {keystore} keystore The new keystore
 *
 * @return {object}      An action object with a type of GENERATE_KEYSTORE_SUCCESS passing the repos
 */
export function generateKeystoreSuccess(keystore) {
  return {
    type: GENERATE_KEYSTORE_SUCCESS,
    keystore,
  };
}
/**
 * Dispatched when generating the wallet fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GENERATE_KEYSTORE_ERROR passing the error
 */
export function generateKeystoreError(error) {
  return {
    type: GENERATE_KEYSTORE_ERROR,
    error,
  };
}

