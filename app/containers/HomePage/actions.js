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
import extractRates from 'utils/unitConverter';
import { message } from 'antd';
import {
  GENERATE_WALLET,
  GENERATE_WALLET_SUCCESS,
  GENERATE_WALLET_ERROR,
  GENERATE_WALLET_CANCEL,

  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR,

  SHOW_RESTORE_WALLET,
  RESTORE_WALLET_CANCEL,
  CHANGE_USER_SEED,
  CHANGE_USER_PASSWORD,
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

  SET_EXCHANGE_RATES,
  SELECT_CURRENCY,

  CLOSE_WALLET,

  CHECK_LOCAL_STORAGE,
  LOCAL_STORAGE_EXIST,
  LOCAL_STORAGE_NOT_EXIST,

  SAVE_WALLET,
  SAVE_WALLET_SUCCESS,
  SAVE_WALLET_ERROR,

  LOAD_WALLET,
  LOAD_WALLET_SUCCESS,
  LOAD_WALLET_ERROR,
} from './constants';


/* ********************************Generate Wallet ******************************* */

/**
 * Open generate wallet modal and generate new random seed and password
 *
 * @return {object}    An action object with a type of GENERATE_WALLET
 */
export function generateWallet() {
  return {
    type: GENERATE_WALLET,
  };
}
/**
 * New Seed and password genetated successfully
 *
 * @param  {string} seed
 * @param  {string} password The current username
 *
 * @return {object}      An action object with a type of GENERATE_WALLET_SUCCESS passing the repos
 */
export function generateWalletSucces(seed, password) {
  return {
    type: GENERATE_WALLET_SUCCESS,
    seed,
    password,
  };
}
/**
 * Dispatched when generating the seed / password fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GENERATE_WALLET_ERROR passing the error
 */
export function generateWalletError(error) {
  message.error(error);
  return {
    type: GENERATE_WALLET_ERROR,
    error,
  };
}
/**
 * Generate wallet is canceled by user
 *
 * @return {object}    An action object with a type of GENERATE_WALLET_CANCEL
 */
export function generateWalletCancel() {
  return {
    type: GENERATE_WALLET_CANCEL,
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
 * close restore wallet modal
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_CANCEL
 */
export function restoreWalletCancel() {
  return {
    type: RESTORE_WALLET_CANCEL,
  };
}

/**
 * Changes the input field for user seed
 *
 * @param  {name} seed The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_SEED
 */
export function changeUserSeed(userSeed) {
  return {
    type: CHANGE_USER_SEED,
    userSeed,
  };
}

/**
 * Changes the input field for user password
 *
 * @param  {name} seed The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_SEED
 */
export function changeUserPassword(userPassword) {
  const password = userPassword;// .replace(/^\s+|\s+$/g, '');
  return {
    type: CHANGE_USER_PASSWORD,
    password,
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
export function restoreWalletFromSeedSuccess(userSeed, userPassword) {
  return {
    type: RESTORE_WALLET_FROM_SEED_SUCCESS,
    userSeed,
    userPassword,
  };
}

/**
 * Invalid seed provided by user
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED_ERROR
 */
export function restoreWalletFromSeedError(error) {
  message.error(error);
  return {
    type: RESTORE_WALLET_FROM_SEED_ERROR,
    error,
  };
}

/** ********************** Confirm seed and generate keystore ************ */

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
 * Transforms tokenList to tokenMap.
 * Example:
 * ['eth','eos','ppt'] ->
 * {
 * eos:{balance: false}
 * eth:{balance: false}
 * ppt:{balance: false}
 * }
 * @param {array} tokenList example: ['eth','eos','ppt']
 *
 * @return {object}    a tokenMap
 */
function createTokenMap(tokenList) {
  const reducer = (acc, token) => ({
    ...acc,
    ...{ [token]: { balance: false } },
  });
  return tokenList.reduce(reducer, {});
}

/**
 * create addressList object which contains the info for each address: ballance per token and index
 * @param {array} tokenList example: ['eth','eos','ppt']
 *
 * @param  {keystore} keystore The new keystore
 *
 * @return {object}      An action object with a type of GENERATE_KEYSTORE_SUCCESS passing the repos
 */
export function generateKeystoreSuccess(keystore, tokenList) {
  /* input:
  tokenList: ['eth','eos','ppt']
 */
  const tokens = createTokenMap(tokenList);
  /* tokens = {
  eos:{balance: false}
  eth:{balance: false}
  ppt:{balance: false}
  } */
  const addresses = keystore.getAddresses();
  const addressList = {};
  for (let i = 0; i < addresses.length; i += 1) {
    addressList[addresses[i]] = {
      index: i + 1, // start from 1 for user display
      ...tokens,
    };
  }
  /* output:
  addressList: {
    address1: {
        index: 1
        eth: {balance: false},
        eos: {balance: false},
        ppt: {balance: false},
      }
  } */
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


/* **********************************Change balance ********************** */
/**
 * Changes ballance for a given address and symbol
 * If address dont exist - new address will be created same for symbol
 *
 * @param  {string} address as string
 * @param  {string} symbol 'eth' or other
 * @param  {string} balance BigNumber object
 *
 * @return {object} An action object with a type of CHANGE_BALANCE with address and balance
 */
export function changeBalance(address, symbol, balance) {
  return {
    type: CHANGE_BALANCE,
    address,
    symbol,
    balance,
  };
}

/** ******************* Show / hide SEND_TOKEN ***************************** */
/**
 * Show the SendToken container
 *
 * @return {object}    An action object with a type of SHOW_SEND_TOKEN
 */
export function showSendToken(address) {
  // console.log(address);
  return {
    type: SHOW_SEND_TOKEN,
    address,
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


/* ******************* Generate new address from existing keystore********** */
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
 * @param {string} newAddress the updated keystore
 * @param {number} index address serial number of generation
 * @param {array}  tokenList example: ['eth','eos','ppt']
 *
 * @return {object}      An action object with a type of GENERATE_ADDRESS_SUCCESS and newAddress passing the newly generated address
 */
export function generateAddressSuccess(newAddress, index, tokenList) {
  const tokenMap = createTokenMap(tokenList);
  tokenMap.index = index;
  return {
    type: GENERATE_ADDRESS_SUCCESS,
    newAddress,
    tokenMap,
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


/* **********************LOCK AND UNLOCK WALLET ***************************** */


/**
 * Lock wallet by removing encription password from state (syncronic)
 *
 * @return {object} An action object with a type of LOCK_WALLET
 */
export function lockWallet() {
  message.success('Wallet locked succesfuly');
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
  message.success('Wallet unlocked succesfuly');
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
  message.error(error, 5);
  return {
    type: UNLOCK_WALLET_ERROR,
    error,
  };
}

/* ************************* Exchange Rates ************************************ */


/**
 * Recives api response and requestUrl used, transforms the api response into the proper format to
 * save in state
 * requestUrl is used as identifier of the apiPrices
 *
 * @param  {string} requestURL the url used to get apiPrices
 * @param  {array} apiRates The response from external api
 * @param  {string} tokenList list of relevant tokens: ['eth','eos','ppt']
 * @return {object} An action object with a type of SET_EXCHANGE_RATES and rates converted to proper format:
 */
export function setExchangeRates(apiRates, requestURL, tokenList) {
  const rates = extractRates(apiRates, requestURL, tokenList);
  console.log(rates);
  
  return {
    type: SET_EXCHANGE_RATES,
    rates,
  };
}

/**
 * Change selected curency to convert to
 *
 * @param  {string} convertTo the selected currency to convert from eth
 *
 * @return {object} An action object with a type of SELECT_CURRENCY and selected currency
 */
export function selectCurrency(convertTo) {
  return {
    type: SELECT_CURRENCY,
    convertTo,
  };
}

/* ********************* CLOSE WALLET **************************************** */


/**
 * Removes keystore from memory and closes wallet
 *
 * @return {object} An action object with a type of CLOSE_WALLET
 */
export function closeWallet() {
  message.success('Wallet removed from memory');
  return {
    type: CLOSE_WALLET,
  };
}

/* ********************* SAVE / LOAD WALLET To localstorage ******************* */
/**
 * check whether there is a stored wallet and update the state.
 *
 * @return {object} An action object with a type of CHECK_LOCAL_STORAGE
 */
export function checkLocalStorage() {
  return {
    type: CHECK_LOCAL_STORAGE,
  };
}

/**
 * Wallet found in local storage check.
 *
 * @return {object} An action object with a type of LOCAL_STORAGE_EXIST
 */
export function localStorageExist() {
  return {
    type: LOCAL_STORAGE_EXIST,
  };
}

/**
 * Wallet NOT found in storage check.
 *
 * @return {object} An action object with a type of LOCAL_STORAGE_NOT_EXIST
 */
export function localStorageNotExist() {
  return {
    type: LOCAL_STORAGE_NOT_EXIST,
  };
}


/**
 * Saves Wallet to local storage
 *
 * @return {object} An action object with a type of SAVE_WALLET
 */
export function saveWallet() {
  return {
    type: SAVE_WALLET,
  };
}
/**
 * Saves Wallet success
 *
 * @return {object} An action object with a type of SAVE_WALLET_SUCCESS
 */
export function saveWalletSuccess() {
  return {
    type: SAVE_WALLET_SUCCESS,
  };
}
/**
 * Saves Wallet error
 *
 * @return {object} An action object with a type of SAVE_WALLET_ERROR
 */
export function saveWalletError(error) {
  console.log(error);
  return {
    type: SAVE_WALLET_ERROR,
    error,
  };
}

/**
 * Load Wallet from local storage
 *
 * @return {object} An action object with a type of LOAD_WALLET
 */
export function loadWallet() {
  return {
    type: LOAD_WALLET,
  };
}

/**
 * Load Wallet success
 *
 * @return {object} An action object with a type of LOAD_WALLET_SUCCESS
 */
export function loadWalletSuccess() {
  return {
    type: LOAD_WALLET_SUCCESS,
  };
}

/**
 * Load Wallet from local storage
 *
 * @return {object} An action object with a type of LOAD_WALLET_ERROR
 */
export function loadWalletError(error) {
  console.log(error);
  return {
    type: LOAD_WALLET_ERROR,
    error,
  };
}

