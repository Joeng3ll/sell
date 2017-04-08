<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <v-footer :seller="seller"></v-footer>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  import Vue from 'vue'
  import QS from 'axios'
  import Footer from 'components/footer/footer.vue'
  const ERROK = 0
  Vue.prototype.$http = QS
  export default {
    data() {
      return {
        seller: ''
      }
    },
    created() {
//        .then中是一个回调
      this.$http.get('/api/seller').then((res) => {
        res = res.data
        if (res.errno === ERROK) {
          this.seller = res.data
        }
      })
    },
    components: {
      'v-header': Header,
      'v-footer': Footer
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.router-link-active
            color: rgb(255, 20, 20)
</style>
