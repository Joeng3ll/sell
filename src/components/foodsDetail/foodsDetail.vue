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
            <card-shop :foodsItem="foodItem" ref="cardShop"></card-shop>
          </div>
        </section>
      </div>
      <!--商品评价-->
      <section class="food-rating">
        <header class="rating-header">
          <p class="rating-header-text">商品评价</p>
          <select-tab :ratingList="ratingList" :ratingTypeDesc="ratingTypeDesc" :isOnly="isOnly"
                      :selectType="selectType"
                      @selectRatingType="selectRatingType"
                      @isReadOnlySelect="isReadOnlySelect" v-if="ratingList.length>0"></select-tab>
          <div v-else class="no-rating">暂无评价</div>
        </header>
        <article class="rating-content">
          <!--评价列表-->
          <section v-for="rating in ratingList" v-show="showRatingList(selectType,isOnly,rating)" class="rating-item">
            <div class="rating-item-header">
              <span>{{rating.rateTime |formatDateFilter(rating.rateTime)}}</span>
              <aside class="avator-box">
                <span class="user-name">{{rating.username}}</span>
                <img class="avator" :src="rating.avatar" width="12px" height="12px">
              </aside>
            </div>
            <!--评价内容-->
            <div class="rating-item-content">
              <i class="icon"></i>
              <p class="rating-text" v-show="rating.text!==''">{{rating.text}}</p>
            </div>
          </section>
        </article>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cardShop from 'components/cardShop/cardShop'
  import BScroll from 'better-scroll'
  import selectTab from 'components/selectTab/selectTab'
  import {formateDate} from 'common/js/date'
  import Store from '../../vuex/store'
  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALLDesc = '全部'
  const POSITIVEDesc = '推荐'
  const NEGATIVEDesc = '吐槽'
  export default {
    data() {
      return {
        ratingList: [],
        selectType: ALL,
        isOnly: false
      }
    },
    created () {
    },
    props: ['foodItem'],
    components: {
      'cardShop': cardShop,
      'selectTab': selectTab
    },
    computed: {
      'ratingTypeDesc': function () {
        return {
          ALL: ALLDesc,
          POSITIVE: POSITIVEDesc,
          NEGATIVE: NEGATIVEDesc
        }
      }
    },
    filters: {
      formatDateFilter(time) {
        let date = new Date(time)
        return formateDate(date)
      }
    },
    methods: {
      _initialScroll() {
        if (this.foodDetailScroll === undefined) {
          this.foodDetailScroll = new BScroll(this.$refs.foodDetailContent, {click: true})
        } else {
          this.foodDetailScroll.refresh()
        }
      },
      _initialRatingList() {
        this.ratingList = this.foodItem.ratings.concat()
      },
//      showDetailPage(item) {
//
//      },
      selectRatingType(type) {
        switch (type) {
          case ALLDesc:
            this.selectType = ALL
            break
          case POSITIVEDesc:
            this.selectType = POSITIVE
            break
          case NEGATIVEDesc:
            this.selectType = NEGATIVE
            break
        }
      },
      showRatingList(selectType, isOnly, rating) {
        if (isOnly && rating.text === '') {
          return false
        } else if (selectType !== 2 && selectType !== rating.rateType) {
          return false
        } else {
          return true
        }
      },
      isReadOnlySelect() {
        this.isOnly = !this.isOnly
        this.$nextTick(() => {
          this.foodDetailScroll.refresh()
        })
      },
      addToCar(foodItem, $event) {
//        console.log(this)
        Store.dispatch('changeBallPosition', $event.target)
        Store.dispatch('dropBalls')
        Store.dispatch('addFoodsList', foodItem)
//        console.log(foodItem)
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
        margin-top 14px
        font-size 0
        border-top 2px solid rgba(7, 17, 27, 0.1)
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        background #fff
        & > .rating-header
          border-bottom 2px solid rgba(7, 17, 27, 0.1)
          padding 18px 18px 0 18px
          & > .rating-header-text
            font-size 14px
          & > .no-rating
            font-size 14px
            padding 12px 0
            color rgba(7, 17, 27, 0.5)
          & > .rating-type-box
            margin-top 6px
            & > .rating-type
              padding 12px 0 18px 0
              border-1px(rgba(7, 17, 27, 0.1))
            & > .select-only
              padding 12px 0
              & > span
                vertical-align top
                & > .icon-check_circle
                  font-size 24px
                  color rgb(147, 153, 159)
              & > .text
                margin-left 4px
                font-size 12px
                line-height 24px
                color rgb(147, 153, 159)
        & > .rating-content
          padding 0 18px
          & > .rating-item
            padding 16px 0
            &:not(:last-child)
              border-1px(rgba(7, 17, 27, 0.1))
            & > .rating-item-header
              font-size 12px
              display flex
              justify-content space-between
              color rgb(147, 153, 159)
              line-height 12px
              & > .avator-box
                font-size 0
                & > .user-name
                  font-size 10px
                & > .avator
                  margin-left 6px
                  vertical-align top
                  display inline-block
                  border-radius 50%
            & > .rating-item-content
              margin-top 6px
              & > .icon
                font-size 12px
                color rgb(147, 153, 159)
                vertical-align top
                margin-right 4px
                &.icon-thumb_up
                  color rgb(0, 160, 220)
                &.icon-thumb_down
                  color rgb(147, 153, 159)
              & > .rating-text
                display inline-block
                margin-top 6px
                font-size 12px
                color rgb(7, 17, 27)
                line-height 16px
</style>
