<template>
  <div class="goods-wrapper">
    <!--商品列表-->
    <aside class="goods-menu">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <tab-component v-bind:tabItem="item" :tabSize="3"></tab-component>
        </li>
      </ul>
    </aside>

    <!--商品详情-->
    <article class="goods-detail">
      <section v-for="item in goods">
        <goods-component :goodsList="item"></goods-component>
      </section>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabComponent from 'components/tab/tab.vue'
  import Qs from 'axios'
  import Vue from 'vue'
  import GoodsItem from 'components/goodsItem/goodsItem.vue'
  Vue.prototype.$http = Qs
  const ERROR_OK = 0
  export default {
    data () {
      return {
        goods: []
      }
    },
    props: ['seller'],
    created () {
      this.$http.get('/api/goods').then(res => {
        res = res.data
        if (res.errno === ERROR_OK) {
          this.goods = res.data
        }
      })
    },
    components: {
      'tabComponent': tabComponent,
      'goodsComponent': GoodsItem
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
        height 100%
        overflow auto
        padding 0 12px
        .menu-item
          height 54px
          color: rgb(0, 20, 20)
          display flex
          align-items center
          justify-content center
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-1px(rgba(7, 17, 27, 0))
        & > .tab-wrapper
          height 100%
          border-1px(rgba(7, 17, 27, 0.1))
        .text
          font-size 12px
          line-height 14px
    .goods-detail
      flex 1
      overflow auto
</style>
