import Vue from 'vue';


import App from './App.vue';
import bus from '../lib/Bus';

Vue.config.productionTip = false;
Vue.prototype.$_bus = bus;

new Vue({
  render: h => h(App),
}).$mount('#app');
