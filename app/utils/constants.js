export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

/* Auto generated password lenght */
export const generatedPasswordLength = 12;

/* Default HD path string for key generation from seed */
export const hdPathString = `m/44'/60'/0'/0`;

// time in ms for check balancess polling
export const timeBetweenCheckbalances = 60000;

/* Max gas for send transaction */
export const maxGasForSendEth = 25000;

/* Eth unit constants will be saved as strings to prevent accidental manimulation
    usage: convert amount to wei
    const sendAmount = new BigNumber(amount).times(Ether);
*/
export const Ether = (1.0e18).toString();
export const Gwei = (1.0e9).toString();

/*
    offline mode is special case of error
*/
export const offlineModeString = 'Offline Mode';
