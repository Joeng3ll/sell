<template>
  <div class="goods-wrapper">
    <!--商品列表-->
    <aside class="goods-menu" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{ 'menu-active' : currentIndex===index }">
          <tab-component v-bind:tabItem="item" :tabSize="3"></tab-component>
        </li>
      </ul>
    </aside>

    <!--商品详情-->
    <article class="goods-detail" ref="foodsDetail">
      <div>
        <section v-for="item in goods" class="goods-list goods-list-hook">
          <goods-component :goodsList="item"></goods-component>
        </section>
      </div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabComponent from 'components/tab/tab.vue'
  import Qs from 'axios'
  import Vue from 'vue'
  import GoodsItem from 'components/goodsItem/goodsItem.vue'
  import BetterScroll from 'better-scroll'
  Vue.prototype.$http = Qs
  const ERROR_OK = 0
  export default {
    data () {
      return {
        goods: [],
        heightArr: [],
        currentY: 0,
        currentIndex: 0
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
    },
    components: {
      'tabComponent': tabComponent,
      'goodsComponent': GoodsItem
    },
    computed: {},
    methods: {
      _initialScroll() {
        if (!this.menuScroll || !this.foodScroll) {
          this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {scrollY: true, probeType: 3})
          this.foodScroll = new BetterScroll(this.$refs.foodsDetail, {scrollY: true, probeType: 3})
        }
        this.foodScroll.on('scroll', function (pos) {
          this.currentY = Math.abs(Math.round(pos.y))
        })
        console.log(this.menuScroll, this.foodScroll)
      },
      _calcuHeight() {
        let lis = this.$refs.foodsDetail.getElementsByClassName('goods-list-hook')
        let lisLen = lis.length
        let preHeight = 0
        for (let i = 0; i < lisLen; i++) {
          preHeight += lis[i].offsetHeight
          this.heightArr.push(preHeight)
        }
        this.switchMenu()
      },
      switchMenu() {
        for (var i = 0; i < this.heightArr.length; i++) {
          let heigh1 = this.heightArr[i]
          let height2 = this.heightArr[i + 1]
          if (this.currentY > heigh1 && this.currentY < height2) {
            this.currentIndex = i + 1
          } else {
            this.currentIndex = 0
          }
        }
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods-wrapper
    position absolute
    display flex
    top: 172px
    bottom: 58px
    width 100%
    overflow hidden
    .goods-menu
      flex 0 0 80px
      width 80px
      background #f3f5f7
      ul
        .menu-active
          background rgb(255, 255, 255)
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

</style>
