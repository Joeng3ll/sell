<template>
  <div class="rating-wrapper" ref="ratingWrapper">
    <div class="scroll-box">
      <header class="rating-header">
        <div class="rating-left">
          <p class="score">{{seller.score}}</p>
          <p class="text">综合评分</p>
          <p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="rating-right">
          <section class="rating-item">
            <span class="text">服务态度</span>
            <div>
              <star-tab :size="36" :score="seller.serviceScore"></star-tab>
            </div>
            <span class="text-score">{{seller.serviceScore}}</span>
          </section>
          <section class="rating-item">
            <span class="text">商品评分</span>
            <div>
              <star-tab :size="36" :score="seller.foodScore"></star-tab>
            </div>
            <span class="text-score">{{seller.foodScore}}</span>
          </section>
          <section class="rating-item">
            <span class="text">送达时间</span>
            <span class="deliverTime">{{seller.deliveryTime}}分钟</span>
          </section>
        </div>
      </header>
      <slide-bar></slide-bar>
      <article class="rating-content">
        <header class="content-header">
          <select-tab :ratingList="ratings"
                      :ratingTypeDesc="ratingTypeDesc"
                      :selectType="selectType"
                      :isOnly="isOnly"
                      @selectRatingType="selectRatingType"
                      @isReadOnlySelect="isReadOnlySelect"></select-tab>
        </header>
        <div class="content">
          <section v-for="rating in ratings" class="item" v-show="showRatingList(selectType,isOnly,rating)">
            <img :src="rating.avatar" class="item-avatar" width="28px" height="28px">
            <div class="item-content">
              <p class="username">{{rating.username}}</p>
              <div class="star">
                <star-tab :size="24" :score="rating.score"></star-tab>
                <span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="rating-text">
                {{rating.text}}
              </p>
              <div>
                <i class="icon" :class="iconType[rating.rateType]"></i>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import StarTab from 'components/star/star'
  import SlideBar from 'components/slideBar/slideBar'
  import SelectTab from 'components/selectTab/selectTab'
  import BScroll from 'better-scroll'
  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALLDesc = '全部'
  const POSITIVEDesc = '满意'
  const NEGATIVEDesc = '不满意'
  export default {
    data () {
      return {
        seller: Object,
        isOnly: false,
        iconType: [],
        ratings: [],
        selectType: ALL
      }
    },
    created() {
      console.log('rating created')
      this.$http.get('/api/seller').then((res) => {
        res = res.data
        if (res.errno === 0) {
          this.seller = res.data
        }
      })
      this.$http.get('/api/rating').then((res) => {
        res = res.data
        if (res.errno === 0) {
          this.ratings = res.data
          this.iconType = ['icon-thumb_up', 'icon-thumb_down']
          this.$nextTick(() => {
            this._initialScroll()
          })
        }
      })
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
    components: {
      'starTab': StarTab,
      'slideBar': SlideBar,
      'selectTab': SelectTab
    },
    methods: {
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
        } else if (selectType !== ALL && selectType !== rating.rateType) {
//          console.log(rating, selectType)
          return false
        } else {
          return true
        }
      },
      isReadOnlySelect() {
        this.isOnly = !this.isOnly
        this.$nextTick(() => {
          this.ratingScroll.refresh()
        })
      },
      _initialScroll() {
        let _this = this
        if (this.ratingScroll === undefined) {
          this.ratingScroll = new BScroll(_this.$refs.ratingWrapper, {click: true})
        } else {
          this.ratingScroll.refresh()
        }
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .rating-wrapper
    position absolute
    width: 100%
    top 174px
    bottom 52px
    overflow hidden
    & > .scroll-box
      & > .rating-header
        display flex
        background #fff
        padding 18px 0
        & > .rating-left
          display flex
          flex 1 1 auto
          flex-direction column
          justify-content center
          align-items center
          padding 0 5px 8px 5px
          border-right 1px solid rgba(7, 17, 27, 0.2)
          & > .score
            font-size 24px
            color rgb(255, 153, 0)
            line-height 28px
          & > .text
            margin-top 6px
            font-size 12px
            color rgb(7, 17, 27)
            line-height 12px
          & > .rankRate
            margin-top 8px
            font-size 10px
            color rgba(7, 17, 27, 0.6)
            line-height 10px
        & > .rating-right
          display flex
          flex-direction column
          flex 2 0 auto
          padding 0 24px
          & > .rating-item
            display flex
            font-size 0
            &:not(:last-child)
              margin-bottom 8px
            & > .text
              display inline-block
              vertical-align top
              margin-right 12px
              font-size 12px
              color rgb(7, 17, 27)
              line-height 18px
            & > .text-score
              display inline-block
              font-size 12px
              line-height 18px
              color rgb(255, 153, 0)
            & > .deliverTime
              color rgb(147, 153, 159)
              font-size 12px
              line-height 18px
            &:last-child
              align-self left
      & > .rating-content
        background #fff
        & > .content-header
          padding 0 18px
          border-bottom 2px solid rgba(7, 17, 27, 0.1)
        & > .content
          padding 0 18px
          & > .item
            display flex
            padding 18px 0
            border-1px(rgba(7, 17, 27, 0.1))
            & > img
              display inline-block
              border-radius 50%
              margin-right 12px
            & > .item-content
              flex 1
              flex-direction column
              font-size 0
              & > .username
                font-size 10px
                color rgb(7, 17, 27)
                line-height 12px
                margin-bottom 4px
              & > .star
                margin-bottom 6px
                & > .deliveryTime
                  font-size 10px
                  font-weight 200
                  color rgb(147, 153, 159)
                  line-height 12px
              & > .rating-text
                font-size 12px
                color rgb(7, 17, 27)
                line-height 18px
                margin-bottom 8px

</style>
