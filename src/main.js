// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import infiniteScroll from 'vue-infinite-scroll';
import VeeValidate from 'vee-validate';


import App from './App';
import router from './router';
import store from './store/store';
import icons from './assets/icons';

config.autoReplaceSvg = 'nest';
library.add(icons);
dom.watch();
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(infiniteScroll);

Vue.config.productionTip = false;

Vue.use(Buefy, { defaultIconPack: 'fa' });

Vue.use(VeeValidate, {
  events: 'blur'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

