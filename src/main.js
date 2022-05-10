// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import { router } from './router'
import axios from 'axios'

import VeeValidate from 'vee-validate'

import { store } from './_store'
import { router } from './_helpers'

Vue.use(VeeValidate)

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
