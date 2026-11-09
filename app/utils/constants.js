/* Auto generated password lenght */
export const generatedPasswordLength = 12;

// time in ms for check balancess polling
export const timeBetweenCheckbalances = 180 * 1000;

// an unlocked wallet locks itself after this time (ms)
export const autoLockTime = 15 * 60 * 1000;

/* Wei per ether, as a string for BigNumber: balance.div(Ether) */
export const Ether = (1.0e18).toString();

/* offline mode is special case of error */
export const offlineModeString = 'Offline';
/* Default network to connect after wallet creation (see network.js) */
export const defaultNetwork = 'Sepolia Testnet';

/* encrypted wallet (see utils/wallet.js) is saved to local storage under this key */
export const localStorageKey = 'wallet';

// addresses:
export const github = 'https://github.com/PaulLaux/eth-hot-wallet';

// APIs:
// Keyless CoinGecko endpoint, queried with ?symbols=eth,...&vs_currencies=usd,eur,btc
export const coinGeckoPriceApi = 'https://api.coingecko.com/api/v3/simple/price';
