<template>
  <div class="footer">
    <div class="footer-left" @click="showDetail()">
      <!--购物车-->
      <section class="shop-car">
        <div class="icon-bg"
             v-bind:class="{ 'car-select': foodsNum>0,'car-not-select': foodsNum===0  }"
        >
          <i class="icon-shopping_cart"></i>
        </div>
        <span class="foods-num" v-if="foodsNum>0">{{foodsNum}}</span>
        <div class="balls-wrapper">
          <section class="balls" v-for="ball in ballList">
            <transition name="drop"
                        v-on:before-enter="beforeDrop"
                        v-on:enter="enterDrop"
                        v-on:after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <span class="inner innerHook"></span>
              </div>
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
    <!--购物车详情-->
    <transition name="slide">
      <div class="car-detail" v-show="detailShow" v-if="hasfoods">
        <aside class="car-box">
          <header class="car-header">
            <p class="header-text">购物车</p>
            <span class="clear-car" @click="clearShopCar">清空</span>
          </header>
          <div class="car-content " ref="carDetail">
            <div class="scroll-box">
              <section class="car-item" v-for="food in foodsList">
                <p class="foods-name">{{food.name}}</p>
                <div class="foods-more">
                  <p class="foods-price"><span class="¥">¥</span>{{food.price}}</p>
                  <card-shop :foodsItem="food" @decreaseFoods="decreaseFoods"></card-shop>
                </div>
              </section>
            </div>
          </div>
        </aside>
      </div>
    </transition>
    <transition name="maskFade">
      <div class="mask" v-show="detailShow" @click="detailShow=false"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Store from '../../vuex/store'
  import cardShop from 'components/cardShop/cardShop'
  import BetterScroll from 'better-scroll'
  export default {
    data() {
      return {
        minPrice: 0,
        ballList: [],
        detailShow: false
      }
    },
    created () {
      let _this = this
      this.$nextTick(function () {
        _this.minPrice = _this.seller.minPrice
        _this.ballList = Store.getters.getBallList
        _this._initialBetterScroll()
      })
    },
    computed: {
      foodsList: function () {
        return Store.getters.getFoodsList
      },
      foodsNum: function () {
        return Store.getters.getFoodsList.length
      },
      totalPrice: function () {
        let amount = 0
        Store.getters.getFoodsList.forEach(function (value, index, arr) {
          amount += value.price * value.checkNum
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
      },
      hasfoods: function () {
        let ishasFoods = false
        if (this.foodsList.length > 0) {
          ishasFoods = true
        }
        return ishasFoods
      }
    },
    props: ['seller'],
    methods: {
      beforeDrop: function (ball) {
        let x = Store.getters.getBallPosition.x - 32
        let y = -(window.innerHeight - Store.getters.getBallPosition.y - 22)
        ball.style.display = ''
        ball.style.webkitTransform = `translate3d(0,${y}px,0)`
        ball.style.transform = `translate3d(0,${y}px,0)`
        ball.getElementsByClassName('innerHook')[0].style.webkitTransform = `translate3d(${x}px,0,0)`
        ball.getElementsByClassName('innerHook')[0].style.transform = `translate3d(${x}px,0,0)`
      },
      enterDrop: function (ball, done) {
        console.log('enterDrop')
        /* eslint-disable no-unused-vars */
        let height = ball.offsetHeight
        this.$nextTick(function () {
          ball.style.webkitTransform = 'translate3d(0,0,0)'
          ball.style.transform = 'translate3d(0,0,0)'
          ball.getElementsByClassName('innerHook')[0].style.webkitTransform = 'translate3d(0,0,0)'
          ball.getElementsByClassName('innerHook')[0].style.transform = 'translate3d(0,0,0)'
        })
      },
      afterDrop (ball) {
        console.log('afterDrop')
        let dropBalls = Store.getters.getDropBallList
        let dropBall = dropBalls.shift
        dropBall.show = false
        ball.style.display = 'none'
      },
      clearShopCar: function () {
        this.detailShow = false
        Store.dispatch('clearShopCar')
      },
      showDetail: function () {
        if (this.$refs.carDetail === undefined) {
          return
        }
        this._initialBetterScroll()
        this.detailShow = !this.detailShow
      },
      _initialBetterScroll: function () {
        if (!this.foodScroll) {
          this.foodScroll = new BetterScroll(this.$refs.carDetail, {
            scrollY: true,
            probeType: 3,
            click: true
          })
        }
        console.log(this.foodScroll)
      },
      decreaseFoods: function () {
        if (this.foodsList.length === 0) {
          this.detailShow = false
        }
      }
    },
    components: {
      'cardShop': cardShop
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .footer
    position fixed
    display flex
    flex-flow row wrap
    height 48px
    line-height 48px
    width 100%
    bottom 0
    background #141d27
    & > .footer-left
      position relative
      flex 1
      font-size 0
      background #141d27
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
          position relative
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
            & > .ball
              display inline-block
              transition all 0.3s cubic-bezier(.62, .01, .66, .47)
              & > .inner
                display inline-block
                width 16px
                height 16px
                background #1aa1d9
                border-radius 50%
                transition all 0.3s linear
      & > .total-price
        position relative
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
        position relative
        display inline-block
        vertical-align top
        margin-left 12px
        font-weight 300
        font-size 16px
        color: rgba(255, 255, 255, 0.4)
    & > .min-price
      position relative
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
    & > .car-detail
      z-index -1
      width 100%
      padding-bottom: 62px
      transition all 0.5s
      transform translate3d(0, -100%, 0)
      &.slide-enter-active, &.slide-leave-active
        transition all 0.5s
      &.slide-enter, &.slide-leave-active
        transform translate3d(0, 0, 0)
      & > .car-box
        width 100%
        max-height 281.5px
        background rgb(255, 255, 255)
        font-size 0
        p
          display inline-block
        & > .car-header
          height 40px
          display flex
          justify-content space-between
          line-height 40px
          background #f3f5f7
          padding 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          & > .header-text
            font-size 14px
            color rbg(7, 17, 27)
            font-weight 200
          & > .clear-car
            font-size 12px
            color rgb(0, 160, 220)
        & > .car-content
          max-height 241.5px
          & > .scroll-box
            padding 0 18px
            & > .car-item
              display flex
              justify-content space-between
              height 48px
              line-height 48px
              border-1px(rgba(7, 17, 27, 0.1))
              & > .foods-name
                font-size 14px
                color rgb(7, 17, 27)
              & > .foods-more
                & > .foods-price
                  & > .¥
                    font-size 10px
                  font-size 14px
                  color rgb(240, 20, 20)
                  margin-right 12px

  .mask
    position fixed
    z-index -2
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.6)
    transition all .5s
    &.maskFade-enter, &.maskFade-leave-active
      opacity 0
</style>
