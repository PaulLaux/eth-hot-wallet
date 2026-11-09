import BigNumber from 'bignumber.js';
import { createWalletClient, erc20Abi, http, isAddress, parseUnits, publicActions } from 'viem';
import { all, take, call, delay, put, select, takeLatest, race, fork } from 'redux-saga/effects';
import { dummyRates } from './tests/dummyRates';

import {
  makeSelectKeystore,
  makeSelectPassword,
  makeSelectAddressMap,
  makeSelectTokenInfoList,
  makeSelectTokenInfo,
} from 'containers/HomePage/selectors';
import {
  changeBalance,
  setExchangeRates,
  updateTokenInfo,
} from 'containers/HomePage/actions';
import request from 'utils/request';

import {
  confirmSendTransactionSuccess,
  confirmSendTransactionError,
  sendTransactionSuccess,
  sendTransactionError,
} from 'containers/SendToken/actions';
import {
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectSendTokenSymbol,
} from 'containers/SendToken/selectors';
import {
  COMFIRM_SEND_TRANSACTION,
  SEND_TRANSACTION,
} from 'containers/SendToken/constants';

import {
  timeBetweenCheckbalances,
  offlineModeString,
  coinGeckoPriceApi,
} from 'utils/constants';
import { timer } from 'utils/common';
import { openVault, accountFor } from 'utils/wallet';
import { message } from 'antd';

import {
  makeSelectPrevNetworkName,
} from './selectors';
import {
  loadNetworkSuccess,
  loadNetworkError,

  checkBalances,
  checkBalancesSuccess,
  CheckBalancesError,
  stopPollingBalances,

  getExchangeRates,
  getExchangeRatesSuccess,
  getExchangeRatesError,
} from './actions';

import {
  LOAD_NETWORK,
  CHECK_BALANCES,
  CHECK_BALANCES_SUCCESS,
  CHECK_BALANCES_ERROR,
  STOP_POLL_BALANCES,
  GET_EXCHANGE_RATES,
} from './constants';

import Network from './network';

// Client for the connected network (null when offline) and the chain ID it serves
let client = null;
let chainId = null;

/* For development only, if online = false then most api calls will be replaced by constant values
* affected functions:
* loadNetwork() will connect to 'Local RPC' but default network name will be showen in gui
* getRates() will not call rate api
*/
const online = true;
if (!online) message.warning('Debug mode: online = false in Header/saga.js');

/**
 * connect to rpc and check that it serves the expected chain
 */
export function* loadNetwork(action) {
  if (!online) {
    message.warning('debug mode: online = false in Header/saga.js');
  }
  try {
    const rpcAddress = online ? Network[action.networkName].rpc : Network['Local RPC'].rpc;
    if (!rpcAddress) {
      throw new Error(`${action.networkName} network not found`);
    }

    if (action.networkName === offlineModeString) {
      client = null;
      yield put(stopPollingBalances());
      yield put(loadNetworkError(offlineModeString));
      return;
    }

    const keystore = yield select(makeSelectKeystore());
    if (!keystore) {
      throw new Error('keystore not initiated - Create wallet before connecting');
    }

    client = null;
    const newClient = createWalletClient({ transport: http(rpcAddress) }).extend(publicActions);
    const newChainId = yield call([newClient, newClient.getChainId]);
    const expectedChainId = online ? Network[action.networkName].chainId : undefined;
    if (expectedChainId && newChainId !== expectedChainId) {
      throw new Error(`RPC for ${action.networkName} serves chain ID ${newChainId}, expected ${expectedChainId}`);
    }
    const blockNumber = yield call([newClient, newClient.getBlockNumber]);
    [client, chainId] = [newClient, newChainId];

    yield call(timer, 600);

    yield put(loadNetworkSuccess(Number(blockNumber)));

    // actions after succesfull network load :
    yield put(checkBalances());
    yield put(getExchangeRates());

    // clear token list if changed network
    const prevNetwork = yield select(makeSelectPrevNetworkName());
    if (prevNetwork !== action.networkName) {
      yield put(updateTokenInfo(keystore.addresses, action.tokenInfo));
    }
  } catch (err) {
    yield put(loadNetworkError(err.shortMessage || err.message));
  }
}


export function* confirmSendTransaction() {
  try {
    const fromAddress = yield select(makeSelectFrom());
    const amount = yield select(makeSelectAmount());
    const toAddress = yield select(makeSelectTo());

    if (!isAddress(fromAddress)) {
      throw new Error('Source address invalid');
    }

    if (amount <= 0) {
      throw new Error('Amount must be possitive');
    }

    if (!isAddress(toAddress)) {
      throw new Error('Destenation address invalid');
    }

    const msg = `Transaction created successfully. 
    Sending ${amount} from ...${fromAddress.slice(-5)} to ...${toAddress.slice(-5)}`;
    yield put(confirmSendTransactionSuccess(msg));
  } catch (err) {
    yield put(confirmSendTransactionError(err.message));
  }
}

/**
 * Sign and send ETH or an ERC-20 transfer. Fees (EIP-1559) and gas are estimated by viem.
 */
export function* SendTransaction() {
  const keystore = yield select(makeSelectKeystore());
  try {
    const fromAddress = yield select(makeSelectFrom());
    // decimal string (no exponent) for parseUnits
    const amount = new BigNumber(yield select(makeSelectAmount())).toFixed();
    const toAddress = yield select(makeSelectTo());
    const password = yield select(makeSelectPassword());

    const tokenToSend = yield select(makeSelectSendTokenSymbol());

    if (!password) {
      throw new Error('No password found - please unlock wallet before send');
    }
    if (!keystore) {
      throw new Error('No keystore found - please create wallet');
    }
    if (!client) {
      throw new Error('Not connected to a network');
    }
    const account = accountFor(keystore, yield call(openVault, keystore, password), fromAddress);

    let tx;
    if (tokenToSend === 'eth') {
      tx = yield call([client, client.sendTransaction], { account, chainId, to: toAddress, value: parseUnits(amount, 18) });
    } else { // any other token
      const tokenInfo = yield select(makeSelectTokenInfo(tokenToSend));
      if (!tokenInfo) {
        throw new Error(`Contract address for token '${tokenToSend}' not found`);
      }
      tx = yield call([client, client.writeContract], {
        account,
        chainId,
        address: tokenInfo.contractAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [toAddress, parseUnits(amount, tokenInfo.decimals)],
      });
    }

    yield put(sendTransactionSuccess(tx));
  } catch (err) {
    yield put(sendTransactionError(err.shortMessage || err.message));
  }
}


/* *************  Polling saga and polling flow for check balances ***************** */
// Balances are kept as BigNumber (wei / token base units) for the UI
export function* getEthBalance(address) {
  return new BigNumber((yield call([client, client.getBalance], { address })).toString());
}

function* getTokenBalance(address, tokenContractAddress) {
  const balance = yield call([client, client.readContract], {
    address: tokenContractAddress, abi: erc20Abi, functionName: 'balanceOf', args: [address],
  });
  return new BigNumber(balance.toString());
}


function* checkTokenBalance(address, symbol) {
  if (!address || !symbol) {
    return null;
  }
  const tokenInfo = yield select(makeSelectTokenInfo(symbol));
  const contractAddress = tokenInfo.contractAddress;

  const balance = yield call(getTokenBalance, address, contractAddress);

  yield put(changeBalance(address, symbol, balance));

  return true;
}

function* checkTokensBalances(address) {
  const opt = {
    returnList: true,
    removeIndex: true,
    removeEth: true,
  };
  const tokenList = yield select(makeSelectAddressMap(address, opt));

  for (let i = 0; i < tokenList.length; i += 1) {
    const symbol = tokenList[i];
    // console.log('address: ' + address + ' token: ' + tokenList[i]);
    yield checkTokenBalance(address, symbol);
  }
  // console.log(tokenMap);
}

export function* checkAllBalances() {
  try {
    let j = 0;
    const addressList = yield select(makeSelectAddressMap(false, { returnList: true }));

    do { // Iterate over all addresses and check for balance
      const address = addressList[j];
      // handle eth
      const balance = yield call(getEthBalance, address);
      yield put(changeBalance(address, 'eth', balance));

      // handle tokens
      yield checkTokensBalances(address);

      j += 1;
    } while (j < addressList.length);

    yield put(checkBalancesSuccess());
  } catch (err) {
    yield put(CheckBalancesError(err.message));
  }
}

// Fetch data every X seconds
function* pollData() {
  try {
    // console.log('pollData');
    yield delay(timeBetweenCheckbalances);

    yield put(checkBalances());
  } catch {
    // console.log('pollData Error');
    // cancellation error -- can handle this if you wish
  }
}

// Start Polling when first call to checkAllBalances succeded or fails
// Wait for successful response or fail, then fire another request
// Cancel polling on STOP_POLL_BALANCES
function* watchPollData() {
  while (true) {
    yield take([CHECK_BALANCES_SUCCESS, CHECK_BALANCES_ERROR]);
    yield race([
      call(pollData),
      take(STOP_POLL_BALANCES),
    ]);
  }
}
/* ******************************************************************************** */

/**
 * Convert a CoinGecko /simple/price response ({ eth: { usd, eur, btc }, ... }) into the
 * [{ symbol, price_usd, price_eur, price_btc }] list that utils/unitConverter expects.
 * Coins missing any of the three prices are skipped.
 */
export function coinGeckoToRates(prices) {
  const currencies = ['usd', 'eur', 'btc'];
  return Object.keys(prices)
    .filter((symbol) => currencies.every((c) => typeof prices[symbol][c] === 'number'))
    .map((symbol) => ({
      symbol: symbol.toUpperCase(),
      price_usd: String(prices[symbol].usd),
      price_eur: String(prices[symbol].eur),
      price_btc: String(prices[symbol].btc),
    }));
}

/**
 * Get exchange rates for eth and all known tokens from CoinGecko
 */
export function* getRates() {
  try {
    const tokenList = yield select(makeSelectTokenInfoList());
    const symbols = ['eth', ...tokenList.filter((symbol) => symbol !== 'eth')];
    const requestURL = `${coinGeckoPriceApi}?symbols=${symbols.join(',')}&vs_currencies=usd,eur,btc`;

    const apiRates = online ?
      coinGeckoToRates(yield call(request, requestURL)) :
      dummyRates;

    yield put(setExchangeRates(apiRates, coinGeckoPriceApi, tokenList));
    yield put(getExchangeRatesSuccess());
  } catch (err) {
    yield put(getExchangeRatesError(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NETWORK, loadNetwork);
  yield takeLatest(COMFIRM_SEND_TRANSACTION, confirmSendTransaction);
  yield takeLatest(SEND_TRANSACTION, SendTransaction);
  yield takeLatest(GET_EXCHANGE_RATES, getRates);

  /* poll check balances */
  yield all([
    fork(watchPollData),
    takeLatest(CHECK_BALANCES, checkAllBalances),
  ]);
  /* End of poll check balances */
}
