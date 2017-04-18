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
              <rate-type-card :ratingList="foodItem.ratings" @selectRatingType="selectRatingType"></rate-type-card>
            </div>
            <!--只看有内容的评价-->
            <section class="select-only" @click="selectReadOnly()">
              <span><i class="icon-check_circle"></i></span>
              <span class="text">只看有内容的评价</span>
            </section>
          </div>
        </header>
        <article class="rating-content">
          <!--评价列表-->
          <section v-for="rating in ratingList" class="rating-item">
            <div class="rating-item-header">
              <span>{{rating.rateTime}}</span>
              <aside class="avator-box">
                <span class="user-name">{{rating.username}}</span>
                <img class="avator" :src="rating.avatar" width="12px" height="12px">
              </aside>
            </div>
            <!--评价内容-->
            <div class="rating-item-content">
              <i class="icon" :class="iconType[rating.rateType]"></i>
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
  import RateTypeCard from 'components/rateTypeCard/rateTypeCard'
  export default {
    data() {
      return {
        ratingList: [],
        allRatingList: [],
        goodRatingList: [],
        badRatingList: [],
        textRatingList: [],
        iconType: [],
        currentRatingList: [],
        readOnly: false
      }
    },
    created () {
      this.iconType = ['icon-thumb_up', 'icon-thumb_down']
    },
    props: ['foodItem'],
    components: {
      'cardShop': cardShop,
      'rateTypeCard': RateTypeCard
    },
    computed: {},
    methods: {
      _initialScroll() {
        if (this.foodDetailScroll === undefined) {
          this.foodDetailScroll = new BScroll(this.$refs.foodDetailContent, {click: true})
        }
        console.log(this.foodDetailScroll + 'initial')
      },
      _initialRatingList() {
        let arr = []
        let contentArr = []
        let goodArr = []
        let badArr = []
        //        0为好评
        const GOOD_TYPE = 0
        //        差评
        const BAD_TYPE = 1
        if (this.foodItem.ratings) {
          this.foodItem.ratings.forEach(function (item) {
            if (item.text !== '') {
              contentArr.push(item)
            } else {
              item.text = '系统默认评价'
            }
            arr.push(item)
          })
        }
        this.allRatingList = arr.concat()
        if (this.allRatingList) {
          this.allRatingList.forEach(function (item) {
//              好评
            if (item.rateType === GOOD_TYPE) {
              goodArr.push(item)
            } else if (item.rateType === BAD_TYPE) {
              badArr.push(item)
            }
          })
        }
        this.ratingList = arr.concat()
        this.goodRatingList = goodArr.concat()
        this.badRatingList = badArr.concat()
        this.textRatingList = contentArr.concat()
      },
      showDetailPage(item) {
        console.log(item)
      },
      closeDetail() {
        this.$emit('closeDetail')
      },
      selectRatingType(type) {
        const ALL_TYPE = '0'
        const GOOD_TYPE = '1'
        const BAD_TYPE = '2'
        switch (type) {
          case ALL_TYPE:
            this.ratingList = this.allRatingList
            break
          case GOOD_TYPE:
            this.ratingList = this.goodRatingList
            break
          case BAD_TYPE:
            this.ratingList = this.badRatingList
            break
        }
      },
      selectReadOnly() {
        let _this = this
        if (_this.readOnly === false) {
          _this.currentRatingList = _this.ratingList.concat()
          _this.ratingList.forEach(function (item, index, arr) {
            if (item.text === '系统默认评价') {
              arr.splice(index, 1)
              console.log(index)
            }
          })
//          for (let i = 0; i < _this.ratingList.length; i++) {
//            if (_this.ratingList[i].text === '系统默认评价') {
//              _this.ratingList.splice(i, 1)
//            }
//          }
          _this.readOnly = true
          console.log(_this.currentRatingList === _this.ratingList)
        } else {
          _this.ratingList = _this.currentRatingList
          _this.readOnly = false
        }
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
