import { put } from 'redux-saga/effects';
import { toUnits, confirmSendTransaction } from '../saga';
import { confirmSendTransactionError } from 'containers/SendToken/actions';
import { COMFIRM_SEND_TRANSACTION_SUCCESS } from 'containers/SendToken/constants';

describe('toUnits', () => {
  it('converts amounts exactly', () => {
    expect(toUnits('1.5', 18)).toBe(1500000000000000000n);
    expect(toUnits('0.123456789012345678', 18)).toBe(123456789012345678n);
    expect(toUnits('6.997705', 6)).toBe(6997705n);
    expect(toUnits('1.5000000', 6)).toBe(1500000n); // trailing zeros are fine
    expect(toUnits('12', 0)).toBe(12n);
    expect(toUnits(0.5, 6)).toBe(500000n);
  });

  it('refuses amounts the token cannot hold, instead of rounding them', () => {
    expect(() => toUnits('0.0000005', 6)).toThrow('Amount can have at most 6 decimals'); // would round up
    expect(() => toUnits('0.0000001', 6)).toThrow('Amount can have at most 6 decimals'); // would round to 0
    expect(() => toUnits('0.1234567890123456789', 18)).toThrow('Amount can have at most 18 decimals');
    expect(() => toUnits('1.5', 0)).toThrow('Amount can have at most 0 decimals');
    expect(() => toUnits('1e-7', 18)).toThrow(); // not a decimal number
  });
});

describe('confirmSendTransaction', () => {
  const from = '0x9858EfFD232B4033E47d90003D41EC34EcaEda94';
  const to = '0x000000000000000000000000000000000000dEaD';
  const usdc = { name: 'USD Coin', contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', decimals: 6 };

  // feeds the selected from, amount, to, token symbol and token info; returns the resulting put
  const confirm = (amount, tokenInfo = usdc) => {
    const gen = confirmSendTransaction();
    gen.next();
    gen.next(from);
    gen.next(amount);
    gen.next(to);
    gen.next('usdc');
    return gen.next(tokenInfo).value;
  };

  it('accepts an amount the token can hold', () => {
    const { action } = confirm('0.000001').payload;
    expect(action.type).toBe(COMFIRM_SEND_TRANSACTION_SUCCESS);
    expect(action.msg).toMatch(/Sending 0\.000001 USDC from \.\.\.Eda94 to \.\.\.0dEaD/);
  });

  it('rejects zero, too many decimals, and unknown tokens', () => {
    expect(confirm(null)).toEqual(put(confirmSendTransactionError('Amount must be possitive')));
    expect(confirm('0.0000001')).toEqual(put(confirmSendTransactionError('Amount can have at most 6 decimals')));
    expect(confirm('1', null).payload.action.error).toMatch(/not found/);
  });
});
