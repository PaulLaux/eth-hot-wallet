import BigNumber from 'bignumber.js';
/*
const requestURL = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR';

// Call our request helper (see 'utils/request')
// const apiPrices = (yield call(request, requestURL))[0];
const ApiPrices =
  {
    "id": "ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": "2",
    "price_usd": "295.412",
    "price_btc": "0.0684231",
    "price_eur": "252.342998284",
    a: "3"
  };

const Output =
  {
    eth_usd: "295.412",
    eth_btc: "0.0684231",
    eth_eur: "252.342998284",
  };
*/
/* map between given api and our format
*  path represent the place inside object and should be in the following format: 'path.inside.object'
*/
const apiMaps =
  {
    'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR':
    {
      eth_usd: { path: 'price_usd', isInverse: false, name: 'USD' },
      eth_btc: { path: 'price_btc', isInverse: false, name: 'BTC' },
      eth_eur: { path: 'price_eur', isInverse: false, name: 'EURO' },
    },
  };


/**
 * Extract api rates and put the in the proper format according to apiMap
 *
 * @param  {string} apiRates response from rates api
 *
 * @param  {string} requestUrl api request address - used as key in apiMaps
 *
 * @return {object}      rates object in native format
 */
export default function extractRates(apiRates, requestUrl) {
  const apiMap = apiMaps[requestUrl];
  const rates = {};
  if (!apiMap) {
    // No map for requestUrl:
    return rates;
  }

  Object.keys(apiMap).forEach((key) => {
    const value = deepValue(apiRates, apiMap[key].path);
    if (value) {
      rates[key] = {};
      rates[key].name = apiMap[key].name;
      rates[key].rate = apiMap[key].isInverse ? new BigNumber(value).toPower(-1) : new BigNumber(value);
    }
  });
  // console.log(prices);
  return rates;
}

/**
 * Get deep value from inside object according to given path string
 *
 * @param  {object} object Object to search inside
 *
 * @param  {string} path Path string inside object
 *
 * @return {object}      value of given path inside object
 */
const deepValue = (object, path) => {
  let target = object;
  for (let i = 0, pathArr = path.split('.'), len = pathArr.length; i < len; i += 1) {
    target = target[pathArr[i]];
  }
  return target;
};
