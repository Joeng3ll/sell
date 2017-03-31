<template>
  <div class="tab-wrapper " :class="size">
    <span class="text"><span class="icon" v-if="tabItem.type>-1" :class="classMap[tabItem.type]"></span>{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        classMap: []
      }
    },
    props: ['tabSize', 'tabItem'],
    created: function () {
      this.classMap = ['decrease-icon', 'discount-icon', 'guarantee-icon', 'invoice-icon', 'special-icon']
    },
    computed: {
      size: function () {
        return 'size-' + this.tabSize
      },
      text: function () {
        return this.tabItem.name
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tab-wrapper
    width 100%
    height 100%
    font-size: 0
    display flex
    justify-content center
    align-items center
    border-1px(rgba(7, 17, 27, 0.1))
    &>.text
      & > .icon
        display inline-block
        margin-right 2px
        vertical-align top
    &.size-1
      &>.text
        & > .icon
          width 12px
          height 12px
          &.decrease-icon
            bg-img('decrease_1', 12px, 12px)
          &.discount-icon
            bg-img('discount_1', 12px, 12px)
          &.guarantee-icon
            bg-img('guarantee_1', 12px, 12px)
          &.invoice-icon
            bg-img('invoice_1', 12px, 12px)
          &.special-icon
            bg-img('special_1', 12px, 12px)
    &.size-2
      &>.text
        & > .icon
          display inline-block
          vertical-align top
          margin-right 2px
          width 16px
          height 16px
          &.decrease-icon
            bg-img('decrease_2', 16px, 16px)
          &.discount-icon
            bg-img('discount_2', 16px, 16px)
          &.guarantee-icon
            bg-img('guarantee_2', 16px, 16px)
          &.invoice-icon
            bg-img('invoice_2', 16px, 16px)
          &.special-icon
            bg-img('special_2', 16px, 16px)
    &.size-3
      &>.text
        & > .icon
          width 12px
          height 12px
          &.decrease-icon
            bg-img('decrease_3', 12px, 12px)
          &.discount-icon
            bg-img('discount_3', 12px, 12px)
          &.guarantee-icon
            bg-img('guarantee_3', 12px, 12px)
          &.invoice-icon
            bg-img('invoice_3', 12px, 12px)
          &.special-icon
            bg-img('special_3', 12px, 12px)
    &.size-4
      &>.text
        & > .icon
          width 16px
          height 16px
          &.decrease-icon
            bg-img('decrease_4', 16px, 16px)
          &.discount-icon
            bg-img('discount_4', 16px, 16px)
          &.guarantee-icon
            bg-img('guarantee_4', 16px, 16px)
          &.invoice-icon
            bg-img('invoice_4', 16px, 16px)
          &.special-icon
            bg-img('special_4', 16px, 16px)
    &>.text
      display inline-block
</style>
