<template>
  <div class="table-responsive">
    <h4>Fund shares</h4>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Share</th>
        <th>Value</th>
        <th>Profit</th>
      </thead>
      <tbody>
        <tr v-for="s in shares" :key="s.name">
          <td>{{ s.name }}</td>
          <td>{{ s.percentage }}%</td>
          <td>{{ (total * s.percentage / 100) | round-2dec | currency(currency) }}</td>
          <td>
            <span :class="{ 'green': (total * s.percentage / 100) - s.initial > 0, 
                            'red': (total * s.percentage / 100) - s.initial < 0 }">
              {{ ((total * s.percentage / 100) - s.initial) | round-2dec | currency(currency) }}
            </span>
            <strong>({{ getPercentage(s) }})</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['total'],
  data() {
    return {};
  },
  computed: {
    shares() {
      return this.$store.state.shares;
    },
    currency() {
      return this.$store.state.currency;
    }
  },
  methods: {
    getPercentage(share) {
      const benefit = this.total * share.percentage / 100 - share.initial;
      const filter = this.$options.filters['round-2dec'];
      const percentage = benefit * 100 / share.initial;
      return `${percentage > 0 ? '+' : ''}${filter(percentage)}%`;
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: green;
}
.red {
  color: red;
}
</style>
