<template>
  <div class="star" :class="starType">
    <span v-for="starClass in classes" :class="starClass" class="star-item">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  const ON = 'on'
  const HALF = 'half'
  const OFF = 'off'
  const starNumber = 5
  export default {
    props: ['size', 'score'],
    computed: {
      starType: function () {
        return 'starType-' + this.size
      },
      classes: function () {
        let starArr = []
        for (var i = 0; i < Math.floor(this.score); i++) {
          starArr.push(ON)
        }
        if (Math.floor(this.score * 2) % 2 !== 0) {
          starArr.push(HALF)
        }
        if (starArr.length < starNumber) {
          starArr.push(OFF)
        }
        return starArr
      }
    }

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl"
  @import "../../common/stylus/mixin.styl"
  .star
    display: inline-block
    &.starType-24
      & > .star-item
        display inline-block
        starStyle(10px, 9.5px, 3.25px)
        &.on
          bg-img('star24_on', 10px, 9.5px)
        &.off
          bg-img('star24_off', 10px, 9.5px)
        &.half
          bg-img('star24_half', 10px, 9.5px)
    &.starType-36
      & > .star-item
        display inline-block
        starStyle(15px, 14.3px, 6.25px)
        &.on
          bg-img('star36_on', 15px, 14.3px)
        &.off
          bg-img('star36_off', 15px, 14.3px)
        &.half
          bg-img('star36_half', 15px, 14.3px)
    &.starType-48
      & > .star-item
        display inline-block
        starStyle(20px, 19px, 15px)
        &.on
          bg-img('star48_on', 20px, 19px)
        &.off
          bg-img('star48_off', 20px, 19px)
        &.half
          bg-img('star48_half', 20px, 19px)
</style>
