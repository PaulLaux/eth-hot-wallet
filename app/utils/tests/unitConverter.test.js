/**
 * Test exchange rate extraction from CoinGecko responses
 */

import extractRates from '../unitConverter';
import { coinGeckoPriceApi } from '../constants';
import { coinGeckoToRates } from '../../containers/Header/saga';

// shape of https://api.coingecko.com/api/v3/simple/price?symbols=eth,usdc,mero&vs_currencies=usd,eur,btc
const response = {
  eth: { usd: 2238.55, eur: 2007.67, btc: 0.02945029 },
  usdc: { usd: 0.999413, eur: 0.896338, btc: 1.314e-05 },
  mero: { usd: 2.514e-05, eur: 2.255e-05 }, // missing btc
};

describe('coinGeckoToRates', () => {
  it('converts prices to the list format and skips incomplete coins', () => {
    expect(coinGeckoToRates(response)).toEqual([
      { symbol: 'ETH', price_usd: '2238.55', price_eur: '2007.67', price_btc: '0.02945029' },
      { symbol: 'USDC', price_usd: '0.999413', price_eur: '0.896338', price_btc: '0.00001314' },
    ]);
  });
});

describe('extractRates with CoinGecko rates', () => {
  const rates = extractRates(coinGeckoToRates(response), coinGeckoPriceApi, ['eth', 'usdc', 'mero']);

  it('extracts eth rates', () => {
    expect(rates.eth_eth.rate.toNumber()).toBe(1);
    expect(rates.eth_usd.rate.toNumber()).toBe(2238.55);
    expect(rates.eth_eur.rate.toNumber()).toBe(2007.67);
    expect(rates.eth_btc.rate.toNumber()).toBe(0.02945029);
  });

  it('extracts token rates via usd and skips tokens without a price', () => {
    expect(rates.eth_usdc.rate.toNumber()).toBeCloseTo(2238.55 / 0.999413, 4);
    expect(rates.eth_mero).toBeUndefined();
  });
});
