import Vue from 'vue';
import Vuex from 'vuex';

import toaster from './toaster.module';
import comman from './comman.module';
import login from './login.module';
import employees from './employees.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    employees,
  },
});

store.registerModule('toaster', toaster);
store.registerModule('comman', comman);
store.registerModule('login', login);

export default store;
