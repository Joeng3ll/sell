<template>
  <div class="food-detail-wrapper" ref="foodDetailContent">
    <div class="food-content">
      <header class="content-header">
        <img :src="foodItem.image">
        <span class="back-icon" @click="closeDetail"><i class="icon-arrow_lift"></i></span>
      </header>
      <!--商品基本信息-->
      <div class="food-base">
        <p class="food-name">{{foodItem.name}}</p>
        <p class="food-sell">月售{{foodItem.sellCount}}份 好评率{{foodItem.rating}}%</p>
        <section>
          <p class="food-price">¥{{foodItem.price}}<span v-show="foodItem.oldPrice>0">¥{{foodItem.oldPrice}}</span>
          </p>
          <div v-if="foodItem.checkNum===0">
            <span class="add-food" @click="addToCar(foodItem,$event)">加入购物车</span>
          </div>
          <div v-else>
            <card-shop foodsItem="foodItem"></card-shop>
          </div>
        </section>
      </div>
      <!--商品评价-->
      <section class="food-rating">
        <header class="rating-header">
          <p class="rating-header-text">商品评价</p>
          <div class="rating-type-box">
            <!--评价分类-->
            <div class="rating-type">
              <p class="rating-type-item rating-0">全部<span></span></p>
              <p class="rating-type-item rating-1">推荐<span></span></p>
              <p class="rating-type-item rating-2">吐槽<span></span></p>
            </div>
            <!--只看有内容的评价-->
            <section class="select-only">
              <span><i></i></span>
              <span>只看有内容的评价</span>
            </section>
          </div>
        </header>
        <article class="rating-content">
          <!--评价列表-->
          <div class="rating-list">
            <section>

            </section>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cardShop from 'components/cardShop/cardShop'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {}
    },
    created () {
      this.$nextTick(function () {
        this._initialScroll()
      })
    },
    props: ['foodItem'],
    components: {
      'cardShop': cardShop
    },
    methods: {
      _initialScroll() {
        if (this.foodDetailScroll === undefined) {
          this.foodDetailScroll = new BScroll(this.$refs.foodDetailContent, {click: true})
        }
        console.log(this.foodDetailScroll)
      },
      showDetailPage(item) {
        console.log(item)
      },
      closeDetail() {
        this.$emit('closeDetail')
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food-detail-wrapper
    position fixed
    width 100%
    top 0
    left 0
    bottom 48px
    background #f3f5f7
    transition all .3s
    &.detailFade-enter
      transform scale(0.85, 0.85)
    &.detailFade-leave-active
      transform translate3d(100%, 0, 0)
    & > .food-content
      & > .content-header
        position relative
        width 100%
        height 0
        padding-top 100%
        & > img
          width 100%
          height 100%
          position absolute
          top 0
          left 0
        & > .back-icon
          position absolute
          top 10px
          left 10px
          & > .icon-arrow_lift
            display block
            padding 8px
            background rgba(255, 255, 255, 0.4)
            text-align center
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%

      & > .food-base
        padding 18px
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        background #fff
        & > .food-name
          font-size 14px
          font-weight 700
          color rgb(7, 17, 27)
          margin-bottom 8px
        & > .food-sell
          font-size 10px
          color rgb(147, 153, 159)
          margin-bottom 18px
        & > section
          display flex
          justify-content space-between
          & > div
            display inline-block
            & > .add-food
              font-size 12px
              padding 5px
              background rgb(0, 160, 220)
              color #fff
              -webkit-border-radius: 8px
              -moz-border-radius: 8px
              border-radius: 8px
          & > .food-price
            font-size 14px
            color rgb(240, 20, 20)
            line-height 24px
            & > span
              margin-left 10px
              color rgb(147, 153, 159)
              font-size 10px
              font-weight normal
      & > .food-rating
        padding 18px 18px 0 18px
        margin-top 14px
        font-size 0
        border-top 2px solid rgba(7, 17, 27, 0.1)
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        background #fff
        & > .rating-header
          & > .rating-header-text
            font-size 14px
          & > .rating-type-box
            & > .rating-type
              border-1px(rgba(7, 17, 27, 0.1))
              & > .rating-type-item
                display inline-block
                padding 8px 12px
                font-size 12px
                line-height 16px
                border-radius 2px
                margin-right 8px
</style>
