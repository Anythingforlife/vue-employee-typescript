import Vue from 'vue';
import App from './App.vue';
import { router } from './_helpers/';
import store from './store/';
import './registerServiceWorker';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'toastr/build/toastr.min.css';
import { Interceptor } from './core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faUserSecret, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
Vue.config.apiURL = 'http://192.168.2.188:4000/';

library.add(faCoffee, faUserSecret, faPowerOff);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields',
});

Interceptor.requestInterceptor();
Interceptor.responseInterceptor();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
