<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="scroll-box">
      <header>
        dd
      </header>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        seller: Object
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
//        console.log(res)
        if (res.data.errno === 0) {
          res = res.data
          this.seller = res.data
        }
        this.$nextTick(() => {
          this._initialScroll()
        })
      })
    },
    methods: {
      _initialScroll() {
        if (this.sellerScroll === undefined) {
          this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {click: true})
        } else {
          this.sellerScroll.refresh()
        }
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .seller-wrapper
    width 100%
    position absolute
    top 174px
    bottom 52px
</style>
