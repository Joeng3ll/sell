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
const ballPosition = {
  x: 0,
  y: 0
}
const state = {
  foodsList: [],
  ballList: ballList,
  ballPosition: ballPosition,
  dropBallList: []
}
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})

