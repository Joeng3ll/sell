<template>
  <div class="selectTab-wrapper">
    <section class="ratingType">
      <p class="ratingType-item all" :class="{active:selectType===2}" @click="select(ratingTypeDesc.ALL,$event)">
        {{ratingTypeDesc.ALL}}<span class="count"></span>
      </p>
      <p class="ratingType-item positive" :class="{active:selectType===0}"
         @click="select(ratingTypeDesc.POSITIVE,$event)">{{ratingTypeDesc.POSITIVE}}<span
        class="count"></span></p>
      <p class="ratingType-item negative" :class="{active:selectType===1}"
         @click="select(ratingTypeDesc.NEGATIVE,$event)">{{ratingTypeDesc.NEGATIVE}}<span
        class="count"></span></p>
    </section>
    <section class="OnlyContent" @click="isReadOnly($event)">
      <i class="icon-check_circle" :class="{active:isOnly}"></i>
      <p class="text">只看有内容的评价</p>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['ratingList', 'ratingTypeDesc', 'selectType', 'isOnly'],
    computed: {},
    methods: {
      select(type, $event) {
        if (!$event._constructed) {
          return
        } else {
          this.$emit('selectRatingType', type)
        }
      },
      isReadOnly($event) {
        if (!$event._constructed) {
          return
        } else {
          this.$emit('isReadOnlySelect')
        }
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .selectTab-wrapper
    padding 12px 0 0 0
    & > .ratingType
      font-size 0
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .ratingType-item
        display inline-block
        padding: 8px 12px
        font-size 12px
        line-height 16px
        border-radius 4px
        &.all
          background rgb(0, 160, 220)
          color rgb(255, 255, 255)
          &.active
            background rgba(0, 160, 220, 0.7)
        &.positive
          background rgba(0, 160, 220, 0.2)
          color rgb(77, 85, 93)
          &.active
            background rgba(0, 160, 220, 0.7)
        &.negative
          background rgba(77, 85, 93, 0.2)
          color rgb(77, 85, 93)
          &.active
            background rgba(0, 160, 220, 0.7)
        &:not(:last-child)
          margin-right 8px
    & > .OnlyContent
      padding 12px 0
      color rgb(147, 153, 159)
      & > .icon-check_circle
        display inline-block
        font-size 24px
        line-height 24px
        vertical-align top
        &.active
          color #00b43c
      & > .text
        display inline-block
        font-size 12px
        line-height 24px
</style>
