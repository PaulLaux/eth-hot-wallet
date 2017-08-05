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
  INIT_WALLET,
  INIT_WALLET_SUCCESS,
  INIT_WALLET_ERROR,
  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR
} from './constants';

import lightwallet from 'eth-lightwallet';

/**
 * Init new wallet - this action starts the init_wallet saga
 *
 * @return {object}    An action object with a type of INIT_WALLET
 */
export function initWallet() {
  return {
    type: INIT_WALLET,
  };
}

/**
 * Dispatched when the wallet initiation is done by the init_wallet saga
 *
 * @param  {string} seed The repository data
 * @param  {string} password The current username
 *
 * @return {object}      An action object with a type of INIT_WALLET_SUCCESS passing the repos
 */
export function walletInitilized(seed, password) {
  return {
    type: INIT_WALLET_SUCCESS,
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
export function initWalletError(error) {
  return {
    type: INIT_WALLET_ERROR,
    error,
  };
}


/** ******** Confirm seed and generate keystore *********** **/

/**
 * Confirm seed and create new keystore
 *
 * @return {object}    An action object with a type of GENERATE_KEYSTORE
 */
export function generateKeystore() {
  // console.log('heeeloo');
  /*
  lightwallet.keystore.createVault({ password: 'abc123' }, (err, ks) => {
    console.log('ss');
    console.log(err);
    console.log(ks);
    ks.keyFromPassword('abc123', function (err, pwDerivedKey) {
      if (err) throw err;

      // generate five new address/private key pairs
      // the corresponding private keys are also encrypted
      ks.generateNewAddress(pwDerivedKey, 5);
      var addr = ks.getAddresses();
      console.log(addr);

      ks.passwordProvider = function (callback) {
        var pw = prompt("Please enter password", "Password");
        callback(null, pw);
      };
    });
  });*/

  return {
    type: GENERATE_KEYSTORE,
  };
}

/**
 * Dispatched when the wallet initiation is done by the init_wallet saga
 *
 * @param  {string} seed The repository data
 * @param  {string} password The current username
 *
 * @return {object}      An action object with a type of INIT_WALLET_SUCCESS passing the repos
 */
export function keystoreGenerated(seed, password) {
  return {
    type: INIT_WALLET_SUCCESS,
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
export function generateKeystoreError(error) {
  return {
    type: INIT_WALLET_ERROR,
    error,
  };
}
