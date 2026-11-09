import { call, put } from 'redux-saga/effects';
import { autoLock, saveWalletS, loadWalletS, deleteWallet, chosenTokenInfo } from '../saga';
import { lockWallet, saveWalletSuccess, saveWalletError, generateKeystoreSuccess, loadWalletSuccess, updateTokenInfo, setExchangeRates, selectCurrency } from '../actions';
import reducer from '../reducer';
import { LOAD_WALLET_ERROR } from '../constants';
import { loadNetwork, getExchangeRates, checkBalances } from 'containers/Header/actions';
import { defaultNetwork, localStorageKey, coinGeckoPriceApi } from 'utils/constants';
import { timer } from 'utils/common';

// action creators show antd messages, which need a DOM
vi.mock('antd', () => ({ message: { success: () => {}, error: () => {} } }));

describe('autoLock', () => {
  it('locks the wallet when the timer wins', () => {
    const gen = autoLock();
    gen.next(); // race between the timer and a manual lock / close
    expect(gen.next({ timeout: true }).value).toEqual(put(lockWallet()));
    expect(gen.next().done).toBe(true);
  });

  it('does nothing if the wallet was locked or closed first', () => {
    const gen = autoLock();
    gen.next();
    expect(gen.next({ locked: {} }).done).toBe(true);
  });
});

describe('wallet in localStorage', () => {
  const vault = { salt: '00ff', iv: 'abcd', data: '1234', addresses: ['0x9858EfFD232B4033E47d90003D41EC34EcaEda94'] };
  const tokenList = ['eth', 'usdc'];
  let storage;

  beforeEach(() => {
    const items = new Map();
    storage = {
      getItem: (k) => (items.has(k) ? items.get(k) : null),
      setItem: (k, v) => items.set(k, String(v)),
      clear: () => items.clear(),
    };
    vi.stubGlobal('localStorage', storage);
    vi.spyOn(console, 'log').mockImplementation(() => {}); // loadWalletError logs
    vi.spyOn(console, 'warn').mockImplementation(() => {}); // saveWalletError warns
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const load = () => {
    const gen = loadWalletS();
    expect(gen.next().value).toEqual(call(timer, 1000));
    gen.next(); // select the current keystore
    return gen.next(false); // none in memory: read localStorage
  };

  it('saves the vault as JSON under the wallet key', () => {
    const gen = saveWalletS();
    gen.next(); // select the keystore
    expect(gen.next(vault).value).toEqual(put(saveWalletSuccess()));
    expect(storage.getItem(localStorageKey)).toBe(JSON.stringify(vault));
  });

  it('does not save without a keystore', () => {
    const gen = saveWalletS();
    gen.next();
    expect(gen.next(false).value).toEqual(put(saveWalletError('No keystore defined')));
    expect(storage.getItem(localStorageKey)).toBe(null);
  });

  it('loads a saved wallet, also one saved by the store.js package (same key, JSON)', () => {
    storage.setItem(localStorageKey, JSON.stringify(vault));
    const gen = loadWalletS();
    gen.next();
    gen.next();
    gen.next(false); // select the token list
    expect(gen.next(tokenList).value).toEqual(put(generateKeystoreSuccess(vault, tokenList)));
    expect(gen.next().value).toEqual(put(loadNetwork(defaultNetwork)));
    expect(gen.next().value).toEqual(put(loadWalletSuccess()));
  });

  it('reports a missing or corrupt wallet as a load error', () => {
    expect(load().value.payload.action).toEqual({ type: LOAD_WALLET_ERROR, error: 'No keystore found in localStorage' });
    storage.setItem(localStorageKey, '{not json');
    expect(load().value.payload.action.type).toBe(LOAD_WALLET_ERROR);
  });

  it('clears localStorage, and survives storage blocked by the browser', () => {
    storage.setItem(localStorageKey, JSON.stringify(vault));
    expect(deleteWallet().next().done).toBe(true);
    expect(storage.getItem(localStorageKey)).toBe(null);

    vi.stubGlobal('localStorage', { clear: () => { throw new DOMException('The operation is insecure.', 'SecurityError'); } });
    expect(() => deleteWallet().next()).not.toThrow();
  });
});

describe('token list changes', () => {
  const addresses = ['0x9858EfFD232B4033E47d90003D41EC34EcaEda94'];
  const tokenInfo = { usds: { name: 'USDS', contractAddress: '0xdC035D45d973E3EC169d2276DDab16f1e407384F', decimals: 18 } };

  it('fetches balances and rates for the chosen tokens, but not in Offline mode', () => {
    const steps = (networkReady) => {
      const gen = chosenTokenInfo({ tokenInfo });
      gen.next(); // select keystore
      expect(gen.next({ addresses }).value).toEqual(put(updateTokenInfo(addresses, tokenInfo)));
      gen.next(); // select networkReady
      return [gen.next(networkReady).value, gen.next().value];
    };
    expect(steps(true)).toEqual([put(checkBalances()), put(getExchangeRates())]);
    expect(steps(false)).toEqual([undefined, undefined]);
  });

  it('falls back to USD when the chosen currency has no rate any more', () => {
    const rates = (symbols) => setExchangeRates([
      { symbol: 'ETH', price_usd: '2000', price_eur: '1800', price_btc: '0.03' },
      ...symbols.map((symbol) => ({ symbol, price_usd: '1', price_eur: '0.9', price_btc: '0.00001' })),
    ], coinGeckoPriceApi, ['eth', ...symbols.map((symbol) => symbol.toLowerCase())]);
    let state = reducer(reducer(undefined, rates(['USDC'])), selectCurrency('eth_usdc'));
    expect(reducer(state, rates(['USDC'])).convertTo).toBe('eth_usdc');
    expect(reducer(state, rates(['USDS'])).convertTo).toBe('eth_usd');
    state = reducer(state, selectCurrency('none'));
    expect(reducer(state, rates(['USDS'])).convertTo).toBe('none');
  });
});
