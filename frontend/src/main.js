import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMq from 'vue-mq';
import VueMask from 'v-mask'


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueMask);

Vue.use(VueMq, {
  breakpoints: {
    mobile: 375,
    tablet: 768,
    desktop: 1200,
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
