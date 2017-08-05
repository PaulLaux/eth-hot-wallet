/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const INIT_WALLET = 'eth-hot-wallet/HomePage/INIT_WALLET';
export const INIT_WALLET_SUCCESS = 'eth-hot-wallet/HomePage/INIT_WALLET_SUCCESS';
export const INIT_WALLET_ERROR = 'eth-hot-wallet/HomePage/INIT_WALLET_ERROR';

export const GENERATE_KEYSTORE = 'eth-hot-wallet/HomePage/GENERATE_KEYSTORE';
export const GENERATE_KEYSTORE_SUCCESS = 'eth-hot-wallet/HomePage/GENERATE_KEYSTORE_SUCCESS';
export const GENERATE_KEYSTORE_ERROR = 'eth-hot-wallet/HomePage/GENERATE_KEYSTORE_ERROR';
