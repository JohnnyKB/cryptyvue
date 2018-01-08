<template>
  <div>
    <select @change="applySetCurrency(selected)" v-model="selected">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
    <div @click="updateCurrency()" class="btn btn-sm btn-secondary">Update numbers</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      selected: this.$store.state.currency
    };
  },
  methods: {
    ...mapActions(['applySetCurrency', 'getCoinMarketCapPrices']),
    updateCurrency() {
      this.getCoinMarketCapPrices();
      this.$emit('updated', this.selected);
    }
  }
};
</script>
