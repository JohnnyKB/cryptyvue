<template>
  <div class="table-responsive">
    <h4>Fund shares</h4>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Share</th>
        <th>Value</th>
      </thead>
      <tbody>
        <tr v-for="s in shares" :key="s.name">
          <td>{{ s.name }}</td>
          <td>{{ s.percentage }}%</td>
          <td>{{ (total * s.percentage / 100) | round-2dec | currency(currency) }}</td>
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
  }
};
</script>
