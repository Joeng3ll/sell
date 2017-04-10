/**
 * Created by joeng on 2017/4/9.
 */
export default {
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
  },
  dropBalls: (state) => {
    let ballslen = state.ballList.length
    for (let i = 0; i < ballslen; i++) {
      if (state.ballList[i].show === false) {
        state.ballList[i].show = true
        state.dropBallList.push(state.ballList[i])
        return
      }
    }
  },
  changeBallPosition: (state, el) => {
    state.ballPosition.x = el.getBoundingClientRect().left
    state.ballPosition.y = el.getBoundingClientRect().top
  }
}
