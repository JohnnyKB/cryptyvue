<template>
  <div>
    <div class="row">
      <div class="col-sm-12"><h2>Control amounts</h2></div>
    </div>
    <div class="row">
      <div v-for="coin in wallet" :key="coin.code" class="col-sm">
        <amount-input :coin="coin"></amount-input>
      </div>
    </div>
  </div>
</template>

<script>
import AmountInput from './AmountInput.vue';

export default {
  data() {
    return {};
  },
  computed: {
    wallet() {
      return this.$store.state.wallet;
    }
  },
  components: {
    AmountInput
  }
};
</script>
