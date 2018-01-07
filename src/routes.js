import App from './App.vue';

export const routes = [
  { path: '', component: App },
  { path: '/:mode', component: App }
];
