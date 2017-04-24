<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="scroll-box">
      dd
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
      })
    },
    methods: {
      _initialScroll() {
        if (!this.sellerScroll && this.$refs.sellerWrapper) {
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
