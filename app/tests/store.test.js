import createStore from '../store';
import header from 'containers/Header/reducer';
import { loadNetwork } from 'containers/Header/actions';
import { generateKeystoreSuccess, changeBalance } from 'containers/HomePage/actions';
import { makeSelectAddressMap, makeSelectTokenDecimalsMap } from 'containers/HomePage/selectors';

const address = '0x9858EfFD232B4033E47d90003D41EC34EcaEda94';

describe('store', () => {
  it('keeps addresses and balances as plain objects', () => {
    const store = createStore();
    store.dispatch(generateKeystoreSuccess({ addresses: [address] }, ['eth', 'usdc']));
    store.dispatch(changeBalance(address, 'usdc', '5000000'));
    store.dispatch(changeBalance(address, 'dai', 1)); // token not in the list: ignored
    const state = store.getState();

    expect(makeSelectAddressMap()(state)).toEqual({ [address]: { index: 1, eth: { balance: false }, usdc: { balance: '5000000' } } });
    expect(makeSelectAddressMap(address, { returnList: true, removeIndex: true, removeEth: true })(state)).toEqual(['usdc']);
    expect(makeSelectTokenDecimalsMap()(state)).toEqual({ eth: 18, usdc: 6, link: 18 });
  });

  it('checks that state stays serializable: balances are strings, not bigint', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const store = createStore();
    store.dispatch(generateKeystoreSuccess({ addresses: [address] }, ['eth']));
    store.dispatch(changeBalance(address, 'eth', '1500000000000000000'));
    expect(error).not.toHaveBeenCalled();
    store.dispatch(changeBalance(address, 'eth', 1n));
    expect(error.mock.calls.some(([msg]) => msg.includes('non-serializable value was detected in the state'))).toBe(true);
    error.mockRestore();
  });

  it('remembers the previous network, but not Offline', () => {
    let state = header(undefined, loadNetwork('Main Net'));
    expect(state.prevNetworkName).toBe('Sepolia Testnet'); // the default, since we were Offline
    state = header(state, loadNetwork('Local RPC'));
    expect(state).toMatchObject({ prevNetworkName: 'Main Net', networkName: 'Local RPC' });
  });
});
