import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'
// import env from './env'

//mock开关
const mock = false
if(mock) {
  require('./mock/api')
}
//根据前端的跨域方式做调整
//mockjs方式或ngnix代理
axios.defaults.baseURL = '/api'
//easy-mock的方式
// axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5e227d04df5e86413d7f1365/mallapi'
axios.defaults.timeout = 8000
//项目不同阶段的baseURL
// axios.defaults.baseURL = env.baseURL

// 接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data
  let path = location.hash
  if(res.status == 0) {
    return res.data
  } else if(res.status == 10) {
    if(path != '#/index') {
      window.location.href = '/#/login'
    }
    // Message.warning(res.msg)
    return Promise.reject(res)
  } else {
    // alert(res.msg)
    Message.info(res.msg)
    return Promise.reject(res)
  }
}, (error) => {
  let res = error.response
  Message.error(res.message)
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
// Vue.component(Message.name, Message)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
