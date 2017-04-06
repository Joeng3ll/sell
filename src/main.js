// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from 'components/goods/goods.vue'
import Seller from 'components/seller/seller.vue'
import Rating from 'components/rating/rating.vue'
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/goods', component: Goods},
    {path: '/rating', component: Rating},
    {path: '/seller', component: Seller}
  ]
})
// 直接通过挂载到vue根实例上进行初始化
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 替代了1.0中的go()
router.push('/goods')
