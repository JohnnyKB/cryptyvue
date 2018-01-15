<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <h1>Crypto Dashboard elPiso💎</h1>
        <h2>Total moneys: <strong>{{ total | round-2dec | currency(currency) }}</strong></h2>
        <div 
          @click="showAmountControls = !showAmountControls" 
          class="btn btn-sm" 
          :class="{ 'btn-light': !showAmountControls, 'btn-info': showAmountControls }">
          {{ showAmountControls ? 'Hide' : 'Show'}} amount controllers
        </div>
        <div 
          @click="showShareTable = !showShareTable" 
          class="btn btn-sm" 
          :class="{ 'btn-light': !showShareTable, 'btn-info': showShareTable }">
          {{ showShareTable ? 'Hide' : 'Show'}} share table
        </div>
      </div>
    </div>
    <hr>
    <div v-if="showAmountControls">
      <amount-controller></amount-controller>
      <hr>
    </div>
    <div v-if="showShareTable">
      <share-table :total="total"></share-table>
      <hr>
    </div>
    <div class="row justify-content-center">
      <coin v-for="c in coins" :data="c" :key="c.code" :currency="currency"></coin>
    </div>
    <div v-if="mode==='johnny'">
      <hr>
      <div class="row justify-content-center mt-3">
        <h3>Johnny total: <strong>{{ johnnyTotal | round-2dec | currency(currency) }}</strong></h3>
        <div class="table-responsive">
        <table class="table table-sm" style="max-width: 320px; margin: 0 auto;">
          <tr>
            <td>+40%</td>
            <td>{{ total*0.4 | round-2dec | currency(currency) }}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td><strong>{{ johnnyTotal + total * 0.4 | round-2dec | currency(currency) }}</strong></td>
          </tr>
        </table>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
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
import ShareTable from './components/ShareTable.vue';
import { mapActions } from 'vuex';

console.log(process.env.DB_HOST);

export default {
  name: 'app',
  data() {
    return {
      currency: this.$store.state.currency,
      mode: this.$route.params.mode,
      showAmountControls: false,
      showShareTable: true
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
    CurrencyController,
    ShareTable
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
