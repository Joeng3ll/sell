/**
 * Created by joeng on 2017/4/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import mutations from './mutation'
import actions from './actions'
Vue.use(Vuex)
const ballList = [
  {show: false},
  {show: false},
  {show: false},
  {show: false}
]
const state = {
  foodsList: [],
  ballList: ballList
}
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})

