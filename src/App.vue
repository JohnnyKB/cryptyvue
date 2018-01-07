<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <h1>Crypto Dashboard elPiso💎</h1>
        <h2>Total moneys: <strong>{{ total | round-2dec | currency(currency) }}</strong></h2>
      </div>
    </div>
    <hr>
    <amount-controller></amount-controller>
    <hr>
    <div class="row justify-content-md-center">
      <coin v-for="c in coins" :data="c" :key="c.code" :currency="currency"></coin>
    </div>
    <div v-if="mode==='johnny'">
      <hr>
      <div class="row justify-content-md-center mt-3">
        <h3>Johnny total: <strong>{{ johnnyTotal | round-2dec | currency(currency) }}</strong> <small>({{ total*0.4 | round-2dec | currency(currency) }})</small></h3>
      </div>
      <div class="row justify-content-md-center mt-3">
        <coin v-for="c in johnnyCoins" :data="c" :key="c.code" :currency="currency"></coin>
      </div>
    </div>
    <hr>
    <currency-controller @updated="updateCurrency($event)"></currency-controller>
  </div>
</template>

<script>
import Coin from './components/Coin.vue';
import AmountController from './components/AmountController.vue';
import CurrencyController from './components/CurrencyController.vue';
import { mapActions } from 'vuex';

console.log(process.env.DB_HOST);

export default {
  name: 'app',
  data() {
    return {
      currency: 'USD',
      mode: this.$route.params.mode
    };
  },
  computed: {
    total() {
      let total = 0;
      for (var c of this.coins) {
        if (this.$store.state.values[c.code] === undefined) continue;
        total = total + c.value * this.$store.state.values[c.code];
      }
      return total;
    },
    johnnyTotal() {
      let total = 0;
      for (var c of this.johnnyCoins) {
        if (this.$store.state.values[c.code] === undefined) continue;
        total = total + c.value * this.$store.state.values[c.code];
      }
      return total;
    },
    coins() {
      return this.$store.state.wallet;
    },
    johnnyCoins() {
      return this.$store.state.johnnyWallet;
    }
  },
  components: {
    Coin,
    AmountController,
    CurrencyController
  },
  methods: {
    ...mapActions([
      'getGdaxPrices',
      'getBinancePrices',
      'getCoinMarketCapPrices'
    ]),
    updateCurrency(newCurrency) {
      this.currency = newCurrency;
    }
  },
  created() {
    // this.getGdaxPrices();
    // this.getBinancePrices();
    this.getCoinMarketCapPrices(this.currency);
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>