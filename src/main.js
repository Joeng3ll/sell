// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// import Goods from 'components/goods/goods.vue'
// import Seller from 'components/seller/seller.vue'
// import Rating from 'components/rating/rating.vue'
import routes from './router/index'
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

const MODE = 'history'
const BASE = __dirname

const router = new VueRouter({
  mode: MODE,
  base: BASE,
  routes
})
// 直接通过挂载到vue根实例上进行初始化
new Vue({
  router,
  render: h => h(App) // 将App渲染
}).$mount('#app')    // 将渲染到#app 替换#app

// 替代了1.0中的go()
// router.push('/rating')
