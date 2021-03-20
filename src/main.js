/* eslint-disable prettier/prettier */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { VuePlausible } from 'vue-plausible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VuePlausible, {
  "apiHost": "https://analytics.chattarize.de/js/index.js"
  // see configuration section
})

Vue.$plausible.enableAutoPageviews()