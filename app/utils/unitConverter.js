import { coinGeckoPriceApi } from 'utils/constants';

/* map to generate convertion rate for each currency
*  path represent the place inside object
*/
const ratesMaps =
  {
    'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR': {
      eth_eth: { path: { const: 1 }, isInverse: false, name: 'ETH' },
      eth_usd: { path: { symbol: 'eth', key: 'price_usd' }, name: 'USD' },
      eth_btc: { path: { symbol: 'eth', key: 'price_btc' }, name: 'BTC' },
      eth_eur: { path: { symbol: 'eth', key: 'price_eur' }, name: 'EURO' },
    },

    'https://api.coinmarketcap.com/v1/ticker/?convert=EUR': {
      eth_eth: { path: { const: 1 }, name: 'ETH' },
      eth_usd: { path: { symbol: 'eth', key: 'price_usd' }, name: 'USD' },
      eth_btc: { path: { symbol: 'eth', key: 'price_btc' }, name: 'BTC' },
      eth_eur: { path: { symbol: 'eth', key: 'price_eur' }, name: 'EURO' },
      eth_eos: { // to get eth_eos: eth_usd * usd_eos
        name: 'EOS',
        path: { symbol: 'eth', key: 'price_usd', isInverse: false },
        path2: { symbol: 'eos', key: 'price_usd', isInverse: true },
      },
    },

    // CoinGecko responses are converted to the list format above by Header/saga.js getRates()
    [coinGeckoPriceApi]: {
      eth_eth: { path: { const: 1 }, name: 'ETH' },
      eth_usd: { path: { symbol: 'eth', key: 'price_usd' }, name: 'USD' },
      eth_btc: { path: { symbol: 'eth', key: 'price_btc' }, name: 'BTC' },
      eth_eur: { path: { symbol: 'eth', key: 'price_eur' }, name: 'EURO' },
    },
  };


/**
 * Adds path for every token in tokenList,
 * to find eth_token path, Each token will be converted using double path:
 * first: eth_usd then usd_token, resulting in eth_token rate
 *
 * @param  {object} ratesMap response from rates api
 * @param  {string[]} tokenList array of token symbols to extract from api response
 * @return {object} ratesMap with new paths for given tokens
 */
const addPathsForTokens = (ratesMap, tokenList) => {
  const resultMap = ratesMap;
  tokenList.forEach((token) => {
    if (token === 'eth') return;
    resultMap[`eth_${token}`] = {
      name: token,
      path: { symbol: 'eth', key: 'price_usd', isInverse: false },
      path2: { symbol: token, key: 'price_usd', isInverse: true },
    };
  });
  return resultMap;
};

/**
 * Extract api rates into a map. keys will be: eth_x where x is currency symbol
 *
 * @param  {object[]} apiRates response from rates api
 * @param  {string} requestUrl api request address - used as key in rateMaps
 * @param  {string[]} tokenList array of token symbols to extract from api response
 * @return {object} map of exchange rates, each key will be eth_x
 */
export default function extractRates(apiRates, requestUrl, tokenList) {
  let ratesMap = ratesMaps[requestUrl];
  if (!ratesMap) {
    // No map found
    return {};
  }
  ratesMap = addPathsForTokens(ratesMap, tokenList);
  const rates = {};

  Object.keys(ratesMap).forEach((key) => {
    const rate1 = getRate(apiRates, ratesMap[key].path);
    // 2 conversion might be needed to get eth_token rate:
    const rate2 = ratesMap[key].path2 && getRate(apiRates, ratesMap[key].path2);
    // only one rate is needed for conversion
    if (rate1 && !ratesMap[key].path2) {
      rates[key] = {
        name: ratesMap[key].name,
        rate: rate1,
      };
    }
    // two rates needed for conversion, multiply both rates:
    if (rate1 && rate2) {
      rates[key] = {
        name: ratesMap[key].name,
        rate: rate1 * rate2,
      };
    }
  });
  return rates;
}

/**
 * Get value from inside object according to given path string
 * first, serach for symbol inside list, then get by key value inside object,
 * inverse rate if needed
 *
 * @param  {object[]} tokenList List of symbols to search inside
 * @param  {object} path Path inside object
 * @param  {string} path.symbol symbol to look for inside array
 * @param  {string} path.key key to get by inside symbol object
 * @param  {boolean} [path.isInverse] should the rate be inversed
 * @param  {number} [path.const] if const is specified, return its value
 *
 * @return {number} value of given path inside object
 */
const getRate = (tokenList, path) => {
  // if const value is specified, just return its value
  if (path.const) {
    return path.const;
  }
  const isSymbol = (element) =>
    element.symbol && element.symbol.toLowerCase() === path.symbol;

  // search for symbol inside array
  const target = tokenList.find(isSymbol);

  if (target) {
    const value = Number(target[path.key]);
    return path.isInverse ? 1 / value : value;
  }
  return null;
  // return target && value;
};

  /* then search by keys nested inside object
  for (let i = 0, pathArr = path.key.split('.'), len = pathArr.length; i < len; i += 1) {
    target = target[pathArr[i]];
  } */
