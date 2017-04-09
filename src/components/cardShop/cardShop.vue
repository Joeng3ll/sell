<template>
  <div class="card-wrapper">
    <transition name="fade">
      <span @click="decreaseFoods($event)" class="decrease" v-if="foodsItem.checkNum>0"><i class="icon-remove_circle_outline inner"
      ></i></span>
    </transition>
      <p v-if="foodsItem.checkNum>0">{{foodsItem.checkNum}}</p>
    <span @click="addFoods($event)"><i class="icon-add_circle"></i></span>
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
      addFoods: function ($event) {
        if (!$event._constructed) {
          return
        }
        this.$emit('addFoods', this.foodsItem)
        this.foodsItem.checkNum++
      },
      decreaseFoods: function ($event) {
        if (!$event._constructed) {
          return
        }
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
    &>.decrease
      transition all .3s
      transform translate3D(0,0,0)
      &>.inner
        display inline-block
        width 20px
        height 20px
        transition all .3s
        transform rotate(0)
      &.fade-enter,&.fade-leave-active
        opacity 0
        transform translate3D(12px,0,0)
        &>.inner
         transform rotate(180deg)
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
