//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入store
import store from './store'
//引入Element UI
import ElementUI from 'element-ui'
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';

import mavonEditor from 'mavon-editor'

//引入js
//import './utils/live2d'
//import './utils/title'
//引入css
//import './assets/css/animation.css'
import './assets/css/animation.css'
import './assets/css/index.css'
import './assets/css/tocbot.css'
import './assets/css/color.css'
import './assets/css/markdown-highlight.css'
import './assets/css/font-awesome.min.css'
import 'mavon-editor/dist/css/index.css'
import common from './utils/common'
import constant from './utils/constant'

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(mavonEditor)


Vue.prototype.$common = common
Vue.prototype.$constant = constant
Vue.filter('dateFormat', function(originVal){
  // 先把传参毫秒转化为new Date()
  const dt = new Date(originVal * 1000)
  const y = dt.getFullYear()
  // 月份是从0开始,需要+1
  // +''是把数字转化为字符串,padStart(2,'0')是把字符串设置为2位数,不足2位则在开头加'0'
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  
  const h = (dt.getHours() + '').padStart(2, '0')
  const M = (dt.getMinutes() + '').padStart(2, '0')
  const s = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d}- - - ${h}:${M}:${s}`
})

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
