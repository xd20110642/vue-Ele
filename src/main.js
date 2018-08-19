
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/css/index.scss'
import store from './stroe'
Vue.config.productionTip = false

// 修改原型链的http 请求
Vue.prototype.$http=axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //引入vuex
  components: { App },
  template: '<App/>'
})
