/**
 * Created by joeng on 2017/4/9.
 */
export default {
  addFoodsList: (state, item) => {
    // let no = state.foodsList.length
    if (item.checkNum === 0) {
      item.checkNum += 1
      state.foodsList.push(item)
    } else {
      item.checkNum++
    }
  },
  desFoodsList: (state, item) => {
    function removeByValue(arr, item) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          arr.splice(i, 1)
          break
        }
      }
    }

    if (item.checkNum === 1) {
      removeByValue(state.foodsList, item)
    }
    item.checkNum--
  },
  clearFoodsList: (state) => {
    let arr = state.foodsList
    arr.forEach((item) => {
      item.checkNum = 0
    })
    state.foodsList = []
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
