<template>
  <div class="detailTab-wrapper">
    <section class="pic-wrapper" ref="picWrapper">
      <img :src="foodItem.image">
      <p class="food-desc">{{foodItem.description}}</p>
    </section>
    <div class="food-detail">
      <p class="food-name">{{foodItem.name}}</p>
      <p class="food-sell">月售{{foodItem.sellCount}}份 好评率{{foodItem.rating}}%</p>
      <section class="food-more">
        <p class="food-price">¥{{foodItem.price}}</p>
        <div v-if="foodItem.checkNum===0">
          <span class="add-food" @click.stop="addToCar(foodItem,$event)">加入购物车</span>
        </div>
        <div v-else>
          <div class="card-wrapper">
            <transition name="fade">
              <span @click.stop="decreaseFoods($event)" class="decrease" v-if="foodItem.checkNum>0"><i
                class="icon-remove_circle_outline inner"></i></span>
            </transition>
            <p v-if="foodItem.checkNum>0">{{foodItem.checkNum}}</p>
            <span @click.stop="addFoods($event)"><i class="icon-add_circle"></i></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Store from '../../vuex/store'
  export default {
    props: ['foodItem'],
    mounted() {
//      console.log('mounted')
    },
    methods: {
      addToCar(foodItem, $event) {
        this.$emit('addToCar', $event)
        Store.dispatch('addFoodsList', foodItem)
      },
      addFoods: function ($event) {
        let addHook = $event.target
        Store.dispatch('changeBallPosition', addHook)
        Store.dispatch('addFoodsList', this.foodItem)
//        this.$nextTick(function () {
//          this.$emit('addToCar', $event)
//        })
      },
      decreaseFoods: function () {
        Store.dispatch('desFoodsList', this.foodItem)
        this.$emit('decreaseFoods')
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .detailTab-wrapper
    font-size 0
    .pic-wrapper
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        display block
        width 100%
        height 100%
      .food-desc
        width 100%
        text-align center
        position absolute
        bottom 5px
        display block
        font-size 10px
        font-weight 200
        color #fff
    .food-detail
      background #fff
      padding 13px 10px 10px 15px
      & > .food-name
        font-size 14px
        margin-bottom 10px
      & > .food-sell
        font-size 10px
        font-weight 200
        margin-bottom 26px
      & > .food-more
        display flex
        justify-content space-between
        div
          display inline-block
          & > .add-food
            font-size 12px
            padding 5px
            background rgb(55, 146, 229)
            color #fff
            -webkit-border-radius: 8px
            -moz-border-radius: 8px
            border-radius: 8px
          & > .card-wrapper
            display inline-block
            height 24px
            line-height 24px
            font-size 0
            & > .decrease
              vertical-align top
              transition all .5s
              transform translate3D(0, 0, 0)
              & > .inner
                display inline-block
                width 20px
                height 20px
                transition all .5s
                transform rotate(0)
              &.fade-enter, &.fade-leave-active
                opacity 0
                transform translate3D(12px, 0, 0)
                & > .inner
                  transform rotate(180deg)
            & > p
              font-size 12px
              display inline-block
              color rgb(147, 153, 159)
              width 24px
              height 24px
              text-align center
              line-height 24px
            & > span
              display inline-block
              line-height 24px
              font-size 0
              vertical-align top
              & > .icon-add_circle, & > .icon-remove_circle_outline
                font-size 20px
                line-height 24px
                color: rgb(26, 161, 217)
        & > .food-price
          font-size 14px
          color #ff6000
</style>
