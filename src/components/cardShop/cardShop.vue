<template>
  <div class="card-wrapper">
    <span @click="decreaseFoods(foodsItem)"><i class="icon-remove_circle_outline"
                                               v-if="foodsItem.checkNum>0"></i></span>
    <p v-if="foodsItem.checkNum>0">{{foodsItem.checkNum}}</p>
    <span @click="addFoods(foodsItem)"><i class="icon-add_circle"></i></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    data () {
      return {
        foodsList: []
      }
    },
    props: ['foodsItem'],
    created () {
      if (typeof this.foodsItem.checkNum === 'undefined') {
        Vue.set(this.foodsItem, 'checkNum', 0)
      }
    },
    methods: {
      addFoods: function () {
        this.$emit('addFoods', this.foodsItem)
        this.foodsItem.checkNum++
      },
      decreaseFoods: function () {
        this.$emit('decreaseFoods', this.foodsItem)
        this.foodsItem.checkNum--
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .card-wrapper
    display flex
    height 24px
    line-height 24px
    & > p
      font-size 12px
      display inline-block
      color rgb(147, 153, 159)
      width 24px
      height 24px
      text-align center
      line-height 24px
    & > span
      display block
      & > .icon-add_circle, & > .icon-remove_circle_outline
        font-size 20px
        line-height 24px
        color: rgb(26, 161, 217)
        vertical-align top
</style>
