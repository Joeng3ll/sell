/**
 * Created by joeng on 2017/4/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  foodsList: []
}
export default new Vuex.Store({
  state: state,
  getters: {
    getFoodsList: (state) => {
      return state.foodsList
    }
  },
  mutations: {
    addFoodsList: (state, item) => {
      let no = state.foodsList.length
      if (item.checkNum === 0) {
        state.foodsList.push({
          'name': item.name,
          'price': item.price,
          'count': item.checkNum + 1,
          'no': no
        })
      } else {
        for (let i = 0; i < state.foodsList.length; i++) {
          if (state.foodsList[i].name === item.name) {
            state.foodsList[i].count++
          }
        }
      }
      console.log(state.foodsList)
    },
    desFoodsList: (state, item) => {
      for (let i = 0; i < state.foodsList.length; i++) {
        if (state.foodsList[i].name === item.name) {
          state.foodsList[i].count--
          if (state.foodsList[i].count === 0) {
            state.foodsList.splice(state.foodsList[i].no, 1)
          }
        }
      }
      console.log(state.foodsList)
    }
  },
  actions: {
    addFoodsList: (context, item) => {
      context.commit('addFoodsList', item)
    },
    desFoodsList: (context, item) => {
      context.commit('desFoodsList', item)
    }
  }
})

