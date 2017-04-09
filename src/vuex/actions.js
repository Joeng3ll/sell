/**
 * Created by joeng on 2017/4/9.
 */
export default {
  addFoodsList: (context, item) => {
    context.commit('addFoodsList', item)
  },
  desFoodsList: (context, item) => {
    context.commit('desFoodsList', item)
  },
  dropBalls: (context) => {
    context.commit('dropBalls')
  }

}
