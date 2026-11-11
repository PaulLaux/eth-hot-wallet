/**
 * Balance and conversion columns of the address table.
 * Expected values were computed independently with exact decimal math.
 */
import { transformList, addConvertRates } from '../index';
import extractRates from 'utils/unitConverter';
import { coinGeckoPriceApi } from 'utils/constants';
import { coinGeckoToRates } from 'containers/Header/saga';

const address = '0x9858EfFD232B4033E47d90003D41EC34EcaEda94';
const decimals = { eth: 18, usdc: 6, link: 18, zero: 18, nodec: 0 };
const rates = extractRates(coinGeckoToRates({
  eth: { usd: 2238.55, eur: 2007.67, btc: 0.02945029 },
  usdc: { usd: 0.999413, eur: 0.896338, btc: 1.314e-05 },
  zero: { usd: 0, eur: 0, btc: 0 }, // a token without value
}), coinGeckoPriceApi, ['eth', 'usdc', 'link', 'zero']);

const balances = (tokenMap, decimalsMap = decimals) =>
  Object.fromEntries(transformList({ [address]: { index: 1, ...tokenMap } }, decimalsMap).map((r) => [r.token, r.balance]));

const convert = (convertTo, exchangeRates = rates) => {
  const rows = transformList({
    [address]: {
      index: 1,
      eth: { balance: '1500000000000000000' }, // 1.5 ETH
      usdc: { balance: '6997705' }, // 6.997705 USDC
      link: { balance: '25000000000000000000' }, // no price for LINK
      zero: { balance: '1000000000000000000000' },
      nodec: { balance: false }, // not checked yet
    },
  }, decimals);
  return Object.fromEntries(addConvertRates(rows, exchangeRates, convertTo).map((r) => [r.token, r.convert]));
};

describe('AddressTable balances', () => {
  it('formats wei / token base units with the token decimals', () => {
    expect(balances({
      eth: { balance: '1500000000000000000' },
      usdc: { balance: '6997705' },
      link: { balance: '0' },
      nodec: { balance: '42' },
    })).toEqual({ eth: '1.5', usdc: '6.997705', link: '0', nodec: '42' });
  });

  it('keeps every digit of very small and very large balances', () => {
    expect(balances({ eth: { balance: '1' }, link: { balance: '123456789012345678901234567890' } }))
      .toEqual({ eth: '0.000000000000000001', link: '123456789012.34567890123456789' });
  });

  it('shows n/a for balances not checked yet, or tokens without decimals', () => {
    expect(balances({ eth: { balance: false }, usdc: { balance: '6997705' } }, { eth: 18 }))
      .toEqual({ eth: 'n/a', usdc: 'n/a' });
  });
});

describe('AddressTable conversion column', () => {
  it('converts to fiat and BTC, rounded to 5 decimals', () => {
    expect(convert('eth_usd')).toEqual({ eth: '3357.825', usdc: '6.9936', link: undefined, zero: '0', nodec: undefined });
    expect(convert('eth_eur')).toMatchObject({ eth: '3011.505', usdc: '6.27229' });
    expect(convert('eth_btc')).toMatchObject({ eth: '0.04418', usdc: '0.00009' });
  });

  it('converts between tokens, and keeps the balance for the same currency', () => {
    expect(convert('eth_eth')).toMatchObject({ eth: '1.5', usdc: '0.00312' });
    expect(convert('eth_usdc')).toMatchObject({ eth: '3359.7972', usdc: '6.997705' });
  });

  it('shows nothing instead of Infinity / NaN, and nothing without rates', () => {
    expect(convert('eth_zero')).toEqual({ eth: undefined, usdc: undefined, link: undefined, zero: '1000', nodec: undefined });
    expect(Object.values(convert('eth_dai')).every((c) => c === undefined)).toBe(true);
    expect(Object.values(convert('eth_usd', {})).every((c) => c === undefined)).toBe(true);
  });
});
