import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// const rating = r => require.ensure([], () => r(require('../components/rating/rating')), 'rating')
const goods = r => require.ensure([], () => r(require('../components/goods/goods')), 'goods')
const rating = r => require.ensure([], () => r(require('../components/rating/rating')), 'rating')
const seller = r => require.ensure([], () => r(require('../components/seller/seller')), 'seller')
const loading = r => require.ensure([], () => r(require('../components/loading/loading.vue')), 'loading')

export default [
  {path: '/', component: loading},
  {path: '/goods', component: goods},
  {path: '/rating', component: rating},
  {path: '/seller', component: seller}
]
