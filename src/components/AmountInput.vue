<template>
  <div class="input-group mb-3">
    <input v-model="amount" type="tel" step="0.000001" class="form-control text-right" >
    <div class="input-group-append">
      <span class="input-group-text" id="basic-addon2">{{ coin.code }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['coin'],
  data() {
    return {
      cacheAmount: 0
    };
  },
  computed: {
    amount: {
      get() {
        return this.coin.value;
      },
      set(newValue) {
        this.cacheAmount = newValue;
        this.applyChangeCoinAmount({
          code: this.coin.code,
          value: this.cacheAmount
        });
      }
    }
  },
  methods: {
    ...mapActions(['applyChangeCoinAmount'])
  }
};
</script>
