import Vue from 'vue';
import Vuex from 'vuex';
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();

import axios from 'axios';

Vue.use(Vuex);

function getLastPricePromise(code, currency) {
  return new Promise((resolve, reject) => {
    let res;
    publicClient.getProductHistoricRates(
      `${code}-${currency}`,
      (error, response) => {
        if (error) {
          reject(new Error(error));
        } else {
          const arr = JSON.parse(response.body);
          res = arr[arr.length - 1][4];
          resolve(res);
        }
      }
    );
  });
}

async function getPrice(code, currency) {
  const price = await getLastPricePromise(code, currency);
  return price;
}

function getLastPricePromiseBinance(code) {
  return axios
    .get('https://api.binance.com/api/v1/ticker/allPrices', {
      crossdomain: true
    })
    .then(res => {
      const saved = res.data.filter(x => x.symbol === `${code}BTC`);
      return saved[0].price;
    })
    .catch(error => {
      console.log(error);
    });
}

async function getBinancePrice(code) {
  const price = await getLastPricePromiseBinance(code);
  return price;
}

async function getCMCPrice(code, currency) {
  return axios
    .get(
      `https://api.coinmarketcap.com/v1/ticker/${code}/?convert=${currency}`,
      {
        crossdomain: true
      }
    )
    .then(res => {
      const format_currency = `price_${currency.toLowerCase()}`;
      return {
        value: res.data[0][format_currency],
        code: res.data[0].symbol
      };
    })
    .catch(error => {
      console.log(error);
    });
}

export const store = new Vuex.Store({
  state: {
    values: {
      LTC: 0,
      BTC: 0,
      ETH: 0,
      XRP: 0,
      TRX: 0,
      XLM: 0
    },
    wallet: [
      {
        name: 'Litecoin',
        code: 'LTC',
        value: 1
      },
      {
        name: 'Bitcoin',
        code: 'BTC',
        value: 0.419554
      },
      {
        name: 'Ripple',
        code: 'XRP',
        value: 1046.63278
      },
      {
        name: 'Ethereum',
        code: 'ETH',
        value: 1.70459
      },
      {
        name: 'TRON',
        code: 'TRX',
        value: 1850.148
      }
    ],
    johnnyWallet: [
      {
        name: 'Ripple',
        code: 'XRP',
        value: 170.5795
      },
      {
        name: 'Stellar',
        code: 'XLM',
        value: 1497.2475
      }
    ],
    currency: 'EUR'
  },
  mutations: {
    assignPrice: (state, payload) => {
      state.values[payload.code] = payload.price;
    },
    assignBinancePrice: (state, payload) => {
      state.values[payload.code] = payload.price * state.values.BTC;
    },
    assignCMCPrice: (state, payload) => {
      state.values[payload.code] = payload.price;
    },
    changeCoinAmount: (state, payload) => {
      const coin = state.wallet.filter(x => x.code === payload.code);
      const index = state.wallet.indexOf(coin[0]);
      state.wallet[index].value = payload.value;
    },
    setCurrency: (state, payload) => {
      state.currency = payload;
    }
  },
  actions: {
    getGdaxPrices: async function(context, code) {
      const currencies = ['BTC', 'LTC', 'ETH'];
      for (var curr of currencies) {
        const price = await getPrice(curr, 'USD');
        context.commit('assignPrice', {
          code: curr,
          price
        });
      }
    },
    getBinancePrices: async function(context, code) {
      const currencies = ['TRX', 'XRP'];
      for (var curr of currencies) {
        const price = await getBinancePrice(curr);
        context.commit('assignBinancePrice', {
          code: curr,
          price
        });
      }
    },
    getCoinMarketCapPrices: async function(context) {
      const currencies = [
        'bitcoin',
        'litecoin',
        'ripple',
        'tron',
        'ethereum',
        'stellar'
      ];
      for (var c of currencies) {
        const data = await getCMCPrice(c, this.state.currency);
        context.commit('assignCMCPrice', {
          name: c,
          price: data.value,
          code: data.code
        });
      }
    },
    applyChangeCoinAmount: (context, payload) => {
      context.commit('changeCoinAmount', payload);
    },
    applySetCurrency: (context, currency) => {
      context.commit('setCurrency', currency);
    }
  }
});
