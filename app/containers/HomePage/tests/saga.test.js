import { put } from 'redux-saga/effects';
import { autoLock } from '../saga';
import { lockWallet } from '../actions';

// lockWallet() shows an antd message, which needs a DOM
vi.mock('antd', () => ({ message: { success: () => {} } }));

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
