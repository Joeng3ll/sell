<template>
  <div class="header">
    <!--内容区开始-->
    <article class="content-wrapper">
      <!--左侧内容：商家头像-->
      <img :src="seller.avatar" alt="商家头像" width="64" height="64">
      <!--右侧：商家信息-->
      <section class="seller-info">
        <div class="seller-name">
          <span class="brand"></span>
          <!--商家名-->
          <p>{{seller.name}}</p>
        </div>
        <!--商家描述-->
        <p class="seller-desc">{{seller.description}}／{{seller.deliveryTime}}分钟送达</p>
        <!--优惠信息-->
        <div v-if="seller.supports" class="seller-support">
          <span class="supports-icon" :class="classMap[seller.supports[0].type]"></span>
          <p>{{seller.supports[0].description}}</p>
        </div>
        <aside v-if="seller.supports" class="more-supports">
          <p class="count">{{seller.supports.length}}个</p>
          <i class="icon-keyboard_arrow_right"></i>
        </aside>
      </section>
    </article>
    <!--内容区结束-->

    <!--公告区开始-->
    <aside class="bulletin-wrapper">
      <span class="bulletin-icon"></span>
      <p>{{seller.bulletin}}</p>
      <i class="icon-keyboard_arrow_right"></i>
    </aside>
    <!--公告区结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        classMap: []
      }
    },
    props: [
      'seller'
    ],
    created() {
      this.classMap = ['decrease-icon', 'discount-icon', 'special-icon', 'invoice-icon', 'guarantee-icon']
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    background: rgba(0, 0, 0, 0.5)
    font-size: 0
    color: rgb(255, 255, 255)
    .content-wrapper
      position: relative
      display: flex
      padding-top: 24px
      padding-left: 24px
      padding-bottom: 18px
      p
        display: inline-block
      img
        margin-right: 16px
        border-radius: 2px
      .seller-info
        .seller-name
          margin-bottom: 8px
          margin-top: 2px
          .brand
            display inline-block
            width: 30px
            height: 18px
            vertical-align top
            bg-img('brand', 30px, 18px)
          p
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .seller-desc
          margin-bottom: 10px
          font-size: 12px
          font-weight: 200
          line-height: 12px
        .seller-support
          .supports-icon
            display: inline-block
            width: 12px
            height: 12px
            vertical-align: top
            margin: 0 4px 2px 0
          .decrease-icon
            bg-img('decrease_1', 12px, 12px)
          .discount-icon
            bg-img('discount_1', 12px, 12px)
          .guarantee-icon
            bg-img('guarantee_1', 12px, 12px)
          .invoice-icon
            bg-img('invoice_1', 12px, 12px)
          .special-icon
            bg-img('special_1', 12px, 12px)
          p
            font-size: 10px
            font-weight: 100
            line-height: 12px
        .more-supports
          position: absolute
          float: right
          height: 24px
          line-height: 24px
          right: 12px
          bottom: 14px
          padding: 5px 11px
          border-radius: 17px
          background: rgba(0, 0, 0, 0.2)
          p
            font-size 10px
            font-weight 100
            line-height 24px
            vertical-align top
          .icon-keyboard_arrow_right
            line-height: 24px
            margin-left: 2px
            font-size 10px

    .bulletin-wrapper
      height: 28px
      padding: 4px 12px
      overflow: hidden
      background: rgba(0, 0, 0, 0.7)
      p
        display: inline
        font-size: 10px
        color: rgb(255, 255, 255)
        font-weight: 100
        line-height: 28px
      .bulletin-icon
        vertical-align top
        display: inline-block
        width: 33px
        height: 18px
        bg-img('bulletin', 33px, 18px)
</style>
