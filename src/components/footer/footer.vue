<template>
  <div class="footer">
    <div class="footer-left">
      <!--购物车-->
      <section class="shop-car">
        <div class="icon-bg" v-bind:class="{ 'car-select': foodsNum>0,'car-not-select': foodsNum===0  }">
          <i class="icon-shopping_cart"></i>
        </div>
        <span class="foods-num" v-if="foodsNum>0">{{foodsNum}}</span>
        <div class="balls-wrapper">
          <section class="balls" v-for="ball in ballList">
            <transition name="drop" v-on:before-enter="beforeDrop()">
              <span class="inner " v-if="ball.show"></span>
            </transition>
          </section>
        </div>
      </section>
      <!--商品总价-->
      <section class="total-price" :class="{'reach-price': totalPrice>0}">
        ¥{{totalPrice}}
      </section>
      <!--配送费-->
      <section class="deliver-price">
        另需配送费¥{{seller.deliveryPrice}}元
      </section>
    </div>
    <!--最低起送费-->
    <div class="min-price"
         :class="{'no-select': totalPrice < seller.minPrice, 'select':totalPrice >= seller.minPrice }">
      <p>{{startPrice}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Store from '../../vuex/store'
  export default {
    data() {
      return {
        foodsList: [],
        minPrice: 0,
        ballList: []
      }
    },
    created () {
      let _this = this
      this.$nextTick(function () {
        _this.minPrice = _this.seller.minPrice
        _this.foodsList = Store.getters.getFoodsList
        _this.ballList = Store.getters.getBallList
      })
    },
    computed: {
      foodsNum: function () {
        return Store.getters.getFoodsList.length
      },
      totalPrice: function () {
        let amount = 0
        Store.getters.getFoodsList.forEach(function (value, index, arr) {
          amount += value.price * value.count
        })
        return amount
      },
      startPrice: function () {
        let text = ''
        if (this.totalPrice === 0) {
          text = '¥' + this.seller.minPrice + '起送'
        } else if (this.totalPrice < this.seller.minPrice) {
          text = '还差¥' + (this.seller.minPrice - this.totalPrice) + '起送'
        } else {
          text = '去结算'
        }
        return text
      }
    },
    props: ['seller'],
    methods: {
      beforeDrop: function (el) {
        console.log(Store.getters.getBallPosition.x)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .footer
    position fixed
    display flex
    height 48px
    line-height 48px
    width 100%
    bottom 0
    background #141d27
    & > .footer-left
      position relative
      flex 1
      font-size 0
      & > .shop-car
        display inline-block
        position: relative
        left 12px
        bottom: 8px
        width 58px
        height 58px
        line-height 58px
        border none
        border-radius 100%
        background #141d27
        & > .icon-bg
          width 44px
          height 44px
          display flex
          justify-content center
          align-items center
          border-radius 100%
          margin 6px auto 0
          &.car-not-select
            background rgb(43, 52, 60)
          &.car-select
            background #00a0dc
            & > .icon-shopping_cart
              color #fff
          & > .icon-shopping_cart
            font-size 24px
            line-height 24px
            color rgb(128, 133, 138)

        & > .foods-num
          display inline-block
          position absolute
          padding 3px 10px
          top -1px
          right -4px
          background red
          color #fff
          font-size 12px
          line-height 12px
          border-radius 10px
        & > .balls-wrapper
          position fixed
          left 32px
          bottom 22px
          line-height 0
          & > .balls
            display inline-block
            transition all 0.3s
            & > .inner
              display inline-block
              width 16px
              height 16px
              background rgb(0, 180, 180)
              transition all 0.3s
      & > .total-price
        display inline-block
        height 100%
        vertical-align top
        margin-left 20px
        padding-right 12px
        color rgb(145, 147, 150)
        font-size 16px
        line-1px(rgba(255, 255, 255, 0.1))
        &.reach-price
          color #fff
      & > .deliver-price
        display inline-block
        vertical-align top
        margin-left 12px
        font-weight 300
        font-size 16px
        color: rgba(255, 255, 255, 0.4)
    & > .min-price
      flex 0 0 105px
      width 105px
      font-size 12px
      font-weight 700
      color rgba(255, 255, 255, 0.4)
      text-align center
      &.no-select
        background rgb(43, 51, 59)
      &.select
        background #00b43c
        color #fff
</style>
