import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import { store } from './store/store';
import { routes } from './routes';

Vue.filter('round-2dec', value => {
  return (Math.round(value * 100) / 100).toLocaleString();
});

Vue.filter('currency', (value, currency) => {
  if (currency === 'USD') {
    return '$' + value.toLocaleString('en-EN');
  } else {
    return value.toLocaleString('es-ES') + '€';
  }
});

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
