import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue'
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask);
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VCalendar from 'v-calendar'
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

Vue.use(VCalendar);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


