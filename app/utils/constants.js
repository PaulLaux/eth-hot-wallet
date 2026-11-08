export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

/* Auto generated password lenght */
export const generatedPasswordLength = 12;

/* Default HD path string for key generation from seed */
export const hdPathString = `m/44'/60'/0'/0`; // eslint-disable-line

// time in ms for check balancess polling
export const timeBetweenCheckbalances = 180 * 1000;

/* Max gas for send transaction (not gas price) */
export const maxGasForEthSend = 25000;
/* Max gas for token send transaction (not gas price).
   Proxy tokens like USDC need ~62k when the recipient has no balance yet; unused gas is refunded. */
export const maxGasForTokenSend = 100000;


/* Eth unit constants will be saved as strings to prevent accidental manipulation
    usage: convert amount to wei
    const sendAmount = new BigNumber(amount).times(Ether);
*/
export const Ether = (1.0e18).toString();
export const Gwei = (1.0e9).toString();

/* offline mode is special case of error */
export const offlineModeString = 'Offline';
/* Default network to connect after wallet creation (see network.js) */
export const defaultNetwork = 'Sepolia Testnet';

/* keystore will be saved to local storage under this key */
export const localStorageKey = 'ks';

// addresses:
export const website = 'https://eth-hot-wallet.com';
export const github = 'https://github.com/PaulLaux/eth-hot-wallet';

// APIs:
// Keyless CoinGecko endpoint, queried with ?symbols=eth,...&vs_currencies=usd,eur,btc
export const coinGeckoPriceApi = 'https://api.coingecko.com/api/v3/simple/price';
