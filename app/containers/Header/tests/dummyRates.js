const tokensOnly = (element) =>
  element.symbol &&
  [
    'eth',
    'eos',
    'symb',
    'trx',
  ].indexOf(element.symbol.toLowerCase() >= 0);
/* eslint-disable */
const rates =
  [
    {
      "id": "ethereum",
      "name": "Ethereum",
      "symbol": "ETH",
      "rank": "3",
      "price_usd": "896.574",
      "price_btc": "0.0591984",
      "24h_volume_usd": "4778610000.0",
      "market_cap_usd": "86732680154.0",
      "available_supply": "96737894.0",
      "total_supply": "96737894.0",
      "max_supply": null,
      "percent_change_1h": "1.06",
      "percent_change_24h": "2.79",
      "percent_change_7d": "14.86",
      "last_updated": "1514959150",
      "price_eur": "743.584405788",
      "24h_volume_eur": "3963197546.82",
      "market_cap_eur": "71932789078.0"
    },
    {
      "id": "eos",
      "name": "EOS",
      "symbol": "EOS",
      "rank": "13",
      "price_usd": "9.21295",
      "price_btc": "0.00060831",
      "24h_volume_usd": "434329000.0",
      "market_cap_usd": "5336207071.0",
      "available_supply": "579207211.0",
      "total_supply": "900000000.0",
      "max_supply": "1000000000.0",
      "percent_change_1h": "0.25",
      "percent_change_24h": "-2.55",
      "percent_change_7d": "-9.72",
      "last_updated": "1514959151",
      "price_eur": "7.6408706379",
      "24h_volume_eur": "360215968.098",
      "market_cap_eur": "4425647369.0"
    },
    {
      "id": "tron",
      "name": "TRON",
      "symbol": "TRX",
      "rank": "14",
      "price_usd": "0.0764752",
      "price_btc": "0.00000505",
      "24h_volume_usd": "1479810000.0",
      "market_cap_usd": "5028106169.0",
      "available_supply": "65748192475.0",
      "total_supply": "100000000000",
      "max_supply": null,
      "percent_change_1h": "8.25",
      "percent_change_24h": "30.53",
      "percent_change_7d": "101.11",
      "last_updated": "1514959153",
      "price_eur": "0.0634256248",
      "24h_volume_eur": "1227298181.22",
      "market_cap_eur": "4170120189.0"
    },
    {
      "id": "symbol",
      "name": "TRON",
      "symbol": "symb",
      "rank": "14",
      "price_usd": "0.0764752",
      "price_btc": "0.00000505",
      "24h_volume_usd": "1479810000.0",
      "market_cap_usd": "5028106169.0",
      "available_supply": "65748192475.0",
      "total_supply": "100000000000",
      "max_supply": null,
      "percent_change_1h": "8.25",
      "percent_change_24h": "30.53",
      "percent_change_7d": "101.11",
      "last_updated": "1514959153",
      "price_eur": "0.0634256248",
      "24h_volume_eur": "1227298181.22",
      "market_cap_eur": "4170120189.0"
    }
  ]; 

export const dummyRates = rates.filter(tokensOnly);
/* eslint-enable */
