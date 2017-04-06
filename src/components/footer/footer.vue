<template>
  <div class="footer">
    <div class="footer-left">
      <!--购物车-->
      <section class="shop-car">
        <div class="icon-bg car-select">
          <i class="icon-shopping_cart"></i>
        </div>
      </section>
      <!--商品总价-->
      <section class="total-price">
        ¥{{totalPrice}}
      </section>
      <!--配送费-->
      <section class="deliver-price">
        另需配送费¥{{seller.deliveryPrice}}元
      </section>
    </div>
    <!--最低起送费-->
    <div class="min-price no-select">
      <p>¥{{seller.minPrice}}起送</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        totalPrice: 0
      }
    },
    props: ['seller']
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
            &>.icon-shopping_cart
              color #fff
          & > .icon-shopping_cart
            font-size 24px
            line-height 24px
            color rgb(128, 133, 138)
      & > .total-price
        display inline-block
        height 100%
        vertical-align top
        margin-left 20px
        padding-right 12px
        color rgb(145, 147, 150)
        font-size 16px
        line-1px(rgba(255, 255, 255, 0.1))
      & > .deliver-price
        display inline-block
        vertical-align top
        margin-left 12px
        font-weight 300
        font-size 16px
        color: rgba(255,255,255,0.4)
    & > .min-price
      flex 0 0 105px
      width 105px
      font-size 12px
      font-weight 700
      color rgba(255,255,255,0.4)
      text-align center
      &.no-select
        background rgb(43,51,59)
      &.select
        background #00b43c
</style>
