import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
/* 把自定义的样式放在第三方样式后面引入 可以覆盖第三方的样式 */
import './styles/index.less'
import './utils/dayjs'
// eslint-disable-next-line no-unused-vars
import VConsole from 'vconsole'
import fastclick from 'fastclick'

fastclick.attach(document.body) // 页面点击 300毫秒延迟
Vue.use(Lazyload)
// var vConsole = new VConsole()
console.log('Hello world')
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
