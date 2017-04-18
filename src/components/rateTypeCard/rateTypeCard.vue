<template>
  <div class="rate-type-wrapper">
    <p class="rating-type-item rating-0" @click="selectRatingType('0')">全部<span>{{allRateCount}}</span></p>
    <p class="rating-type-item rating-1" @click="selectRatingType('1')">推荐<span>{{goodRateCount}}</span></p>
    <p class="rating-type-item rating-2" @click="selectRatingType('2')">吐槽<span
      v-show="badRateCount>0">{{badRateCount}}</span></p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['ratingList'],
    computed: {
      'allRateCount': function () {
        let count = 0
        if (this.ratingList) {
          count = this.ratingList.length
        }
        return count
      },
      'goodRateCount': function () {
        let count = 0
        if (this.ratingList) {
          this.ratingList.forEach(function (item) {
            if (item.rateType === 0) {
              count++
            }
          })
        }
        return count
      },
      'badRateCount': function () {
        let count = 0
        if (this.ratingList) {
          this.ratingList.forEach(function (item) {
            if (item.rateType === 1) {
              count++
            }
          })
        }
        return count
      }
    },
    methods: {
      selectRatingType: function () {
        console.log(this)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rate-type-wrapper
    & > .rating-type-item
      display inline-block
      padding 8px 12px
      font-size 12px
      line-height 16px
      border-radius 2px
      margin-right 8px
      line-height 16px
      &.rating-0
        background rgb(0, 160, 220)
        color #fff
      &.rating-1
        background rgba(0, 160, 220, 0.2)
        color rgb(77, 85, 93)
      &.rating-2
        color rgb(77, 85, 93)
        background rgba(77, 85, 93, 0.2)
      & > p
        & > span
          font-size 10px
</style>
