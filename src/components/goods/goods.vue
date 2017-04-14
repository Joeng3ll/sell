<template>
  <div class="goods-wrapper">
    <!--商品列表-->
    <aside class="goods-menu" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{ 'menu-active' : currentIndex===index }"
            @click="selectMenu(index,$event)">
          <tab-component v-bind:tabItem="item" :tabSize="3"></tab-component>
        </li>
      </ul>
    </aside>

    <!--商品详情-->
    <article class="goods-detail" ref="foodsDetail">
      <div>
        <section v-for="item in goods" class="goods-list goods-list-hook">
          <goods-component :goodsList="item" @addFoods.stop="addFoods" @decreaseFoods.stop="decreaseFoods"
                           @showFoodDetail="showFoodDetail"></goods-component>
        </section>
      </div>
    </article>
    <!--商品详情页弹出层开始-->
    <div class="foodDetail-mask" v-show="showDetailTag" @click.prevent="showDetailTag=false">
      <transition name="tabFade">
        <!--商品详情小图开始-->
        <div class="foodDetail-tab" v-show="showDetailTag">
          <foods-tab :foodItem="foodItem"></foods-tab>
        </div>
        <!--商品详情小图结束-->
      </transition>
      <!--背景层开始-->
      <div class="bg">
        <img :src="foodItem.image" width="100%" height="100%">
      </div>
      <!--背景层结束-->
    </div>
    <!--商品详情页弹出层结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import tabComponent from 'components/tab/tab.vue'
  import Qs from 'axios'
  import Vue from 'vue'
  import GoodsItem from 'components/goodsItem/goodsItem.vue'
  import BetterScroll from 'better-scroll'
  import Store from '../../vuex/store'
  import foodsDetailTab from 'components/foodsDetailTab/foodsDetailTab'
  Vue.prototype.$http = Qs
  const ERROR_OK = 0
  export default {
    data () {
      return {
        goods: [],
        heightArr: [],
        currentY: 0,
        foodsList: [],
        foodItem: Object,
        showDetailTag: false
      }
    },
    props: ['seller'],
    created () {
      this.$http.get('/api/goods').then(res => {
        res = res.data
        if (res.errno === ERROR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initialScroll()
            this._calcuHeight()
          })
        }
      })
      this.$nextTick(() => {
        this.foodsList = Store.getters.getFoodsList
      })
    },
    components: {
      'tabComponent': tabComponent,
      'goodsComponent': GoodsItem,
      'foodsTab': foodsDetailTab
    },
    computed: {
      currentIndex: function () {
        for (let i = 0; i < this.heightArr.length; i++) {
          if (this.currentY < this.heightArr[0]) {
            return 0
          } else {
            let h1 = this.heightArr[i]
            let h2 = this.heightArr[i + 1]
            if (this.currentY >= h1 && this.currentY < h2) {
              return i + 1
            }
          }
        }
      }
    },
    methods: {
      _initialScroll() {
        var _this = this
        if (!this.menuScroll || !this.foodScroll) {
          this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {scrollY: true, probeType: 3, click: true})
          this.foodScroll = new BetterScroll(this.$refs.foodsDetail, {scrollY: true, probeType: 3, click: true})
        }
        this.foodScroll.on('scroll', function (pos) {
          _this.currentY = Math.abs(Math.round(pos.y))
        })
        console.log(this.foodScroll)
      },
      _calcuHeight() {
        let lis = this.$refs.foodsDetail.getElementsByClassName('goods-list-hook')
        let lisLen = lis.length
        let preHeight = 0
        for (let i = 0; i < lisLen; i++) {
          preHeight += lis[i].offsetHeight
          this.heightArr.push(preHeight)
        }
      },
      selectMenu(index, event) {
        let lis = this.$refs.foodsDetail.getElementsByClassName('goods-list-hook')
        let el = lis[index]
        if (!event._constructed || this.currentIndex === index) {
          return
        } else if (index === 0) {
          this.foodScroll.scrollToElement(el, 1)
        } else {
          this.foodScroll.scrollToElement(el, 1)
        }
      },
      addFoods(item) {
//        Store.dispatch('addFoodsList', item)
//        Store.dispatch('dropBalls')
      },
      decreaseFoods(item) {
//        Store.dispatch('desFoodsList', item)
      },
      showFoodDetail(item) {
        this.showDetailTag = true
        this.foodItem = item
        console.log(this.foodItem)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods-wrapper
    position absolute
    display flex
    top: 174px
    bottom: 52px
    width 100%
    overflow hidden
    .goods-menu
      flex 0 0 80px
      width 80px
      background #f3f5f7
      ul
        .menu-active
          background rgb(255, 255, 255)
          margin-top -1px
          position relative
          z-index 10
          border-left: 2px solid red;
          & > .tab-wrapper
            font-weight 700
            border-1px(rgba(255, 255, 255, 0))
        .menu-item
          height 54px
          color: rgb(0, 20, 20)
          display flex
          align-items center
          justify-content center
          padding 0 12px
        .text
          font-size 12px
          line-height 14px
    .goods-detail
      flex 1
      height 100%
      position relative
    & > .foodDetail-mask
      position fixed
      z-index 100
      display flex
      justify-content center
      align-items center
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7, 17, 27, 0.9)
      & > .foodDetail-tab
        width 85%
        border-radius 5px
        transition all 0.3s
        &.tabFade-enter,&.tabFade-leave-active
          transform scale(0.5,0.5)
        & > .detailTab-wrapper
          & > .pic-wrapper
            & > img
              border-top-left-radius 5px
              border-top-right-radius 5px
          & > .food-detail
            border-bottom-left-radius 5px
            border-bottom-right-radius 5px
      & > .bg
        position absolute
        z-index -1
        width 100%
        height 100%
        top 0
        left 0
        filter blur(30px)
</style>
