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
  CHANGE_USER_SEED,
  RESTORE_WALLET_FROM_SEED,
  RESTORE_WALLET_FROM_SEED_SUCCESS,
  RESTORE_WALLET_FROM_SEED_ERROR,

  CHANGE_BALANCE,

  SHOW_SEND_TOKEN,
  HIDE_SEND_TOKEN,

  GENERATE_ADDRESS,
  GENERATE_ADDRESS_SUCCESS,
  GENERATE_ADDRESS_ERROR,

  LOCK_WALLET,
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
  UNLOCK_WALLET_ERROR,
} from './constants';

// import { makeSelectAddresses } from './selectors'; 
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

/**
 * Changes the input field for user seed
 *
 * @param  {name} seed The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_SEED
 */
export function changeUserSeed(seed) {
  return {
    type: CHANGE_USER_SEED,
    seed,
  };
}

/**
 * Try to restore wallet from seed provided by user.
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED
 *
 */
export function restoreWalletFromSeed() {
  return {
    type: RESTORE_WALLET_FROM_SEED,
  };
}

/**
 * Valid seed provided by user
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED_SUCCESS
 */
export function restoreWalletFromSeedSuccess() {
  return {
    type: RESTORE_WALLET_FROM_SEED_SUCCESS,
  };
}

/**
 * Invalid seed provided by user
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED_ERROR
 */
export function restoreWalletFromSeedError(error) {
  return {
    type: RESTORE_WALLET_FROM_SEED_ERROR,
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
  return {
    type: GENERATE_KEYSTORE,
  };
}
/**
 * create addressList object which contains the info needed for each address such as ballance
 *
 * @param  {keystore} keystore The new keystore
 *
 * @return {object}      An action object with a type of GENERATE_KEYSTORE_SUCCESS passing the repos
 */
export function generateKeystoreSuccess(keystore) {
  const addresses = keystore.getAddresses();
  /*
  addressList: {
    lastIndex: 8
    address0: {
        index: 0
        eth: {
            balance: bigNumber
            convertBalance: bigNumber
          }
      }
  } */

  const addressList = {};
  for (let i = 0; i < addresses.length; i += 1) {
    addressList[addresses[i]] = {
      index: i,
      eth: {
        balance: false,
        convertBalance: false,
      },
    };
  }
  // addressList.lastIndex = addresses.length - 1; TodO

  return {
    type: GENERATE_KEYSTORE_SUCCESS,
    keystore,
    addressList,
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


/* **********************************Change balance ***********************/
/**
 * Changes ballance for a given address
 * If address dont exist - new address will be created
 *
 * @param  {object} address as string
 * @param  {object} balance BigNumber object
 *
 * @return {object} An action object with a type of CHANGE_BALANCE with address and balance
 */
export function changeBalance(address, balance) {
  return {
    type: CHANGE_BALANCE,
    address,
    balance,
  };
}

/** ******************* Show / hide SEND_TOKEN ******************************/
/**
 * Show the SendToken container
 *
 * @return {object}    An action object with a type of SHOW_SEND_TOKEN
 */
export function showSendToken() {
  return {
    type: SHOW_SEND_TOKEN,
  };
}

/**
 * Hide the SendToken container
 *
 * @return {object}    An action object with a type of HIDE_SEND_TOKEN
 */
export function hideSendToken() {
  return {
    type: HIDE_SEND_TOKEN,
  };
}


/* ******************* Generate new address from existing keystore***********/
/**
 * Generate new address and attach it to store
 *
 *
 * @return {object} An action object with a type of GENERATE_ADDRESS
 */
export function generateAddress() {
  return {
    type: GENERATE_ADDRESS,
  };
}

/**
 * After successfull address generation create new addressList for our store.
 *
 * @param  {keystore} keystore the updated keystore
 *
 * @return {object}      An action object with a type of GENERATE_ADDRESS_SUCCESS and newAddress passing the newly generated address
 */
export function generateAddressSuccess(newAddress) {
  return {
    type: GENERATE_ADDRESS_SUCCESS,
    newAddress,
  };
}

/**
 * Dispatched when generating new address fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GENERATE_ADDRESS_ERROR passing the error
 */
export function generateAddressError(error) {
  return {
    type: GENERATE_ADDRESS_ERROR,
    error,
  };
}


/* **********************LOCK AND UNLOCK WALLET ******************************/


/**
 * Lock wallet by removing encription password from state (syncronic)
 *
 * @return {object} An action object with a type of LOCK_WALLET
 */
export function lockWallet() {
  return {
    type: LOCK_WALLET,
  };
}

/**
 * Unlock wallet
 *
 * @return {object} An action object with a type of UNLOCK_WALLET
 */
export function unlockWallet() {
  return {
    type: UNLOCK_WALLET,
  };
}

/**
 * Password given is checked to successfully unlock the wallet
 *
 * @param  {keystore} password for unlocking the wallet
 *
 * @return {object}      An action object with a type of UNLOCK_WALLET_SUCCESS and the password
 */
export function unlockWalletSuccess(password) {
  return {
    type: UNLOCK_WALLET_SUCCESS,
    password,
  };
}

/**
 * Dispatched when password given by user is incorrect
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GENERATE_ADDRESS_ERROR passing the error
 */
export function unlockWalletError(error) {
  return {
    type: UNLOCK_WALLET_ERROR,
    error,
  };
}
