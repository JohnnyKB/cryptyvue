<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-header" v-if="!loaded">
        {{ data.name }} ({{ price | round-2dec | currency(currency) }})
      </div>
      <div class="card-body" v-if="!loaded">
        <h5 class="card-title">{{ data.value | round-2dec }} {{ data.code }}</h5>
        <p class="card-text">{{ value | round-2dec | currency(currency) }}</p>
      </div>
      <div class="loader" v-if="loaded"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'currency'],
  computed: {
    value() {
      return this.$store.state.values[this.data.code] * this.data.value;
    },
    price() {
      return this.$store.state.values[this.data.code];
    },
    loaded() {
      return this.$store.state.values[this.data.code] === 0;
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 40px auto;
  font-size: 6px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.6em solid rgba(0, 0, 0, 0.2);
  border-right: 1.6em solid rgba(0, 0, 0, 0.2);
  border-bottom: 1.6em solid rgba(0, 0, 0, 0.2);
  border-left: 1.6em solid #eeeeee;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
