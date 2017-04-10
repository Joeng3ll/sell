/**
 * Created by joeng on 2017/4/7.
 */
export default {
  getFoodsList: (state) => {
    return state.foodsList
  },
  getBallList: (state) => {
    return state.ballList
  },
  getBallPosition: (state) => {
    return state.ballPosition
  },
  getDropBallList: (state) => {
    return state.dropBallList
  }
}
