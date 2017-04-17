<template>
  <div class="card-wrapper">
    <transition name="fade">
      <span @click.stop="decreaseFoods($event)" class="decrease" v-if="foodsItem.checkNum>0"><i
        class="icon-remove_circle_outline inner"
      ></i></span>
    </transition>
    <p v-if="foodsItem.checkNum>0">{{foodsItem.checkNum}}</p>
    <span @click.stop="addFoods($event)"><i class="icon-add_circle"></i></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Store from '../../vuex/store'
  export default {
    data () {
      return {
        foodsList: []
      }
    },
    props: ['foodsItem'],
    created () {
//      console.log(typeof this.foodsItem)
      if (typeof this.foodsItem.checkNum === 'undefined' && typeof this.foodsItem === 'object') {
        Vue.set(this.foodsItem, 'checkNum', 0)
      }
    },
    methods: {
      addFoods: function ($event) {
        if (!$event._constructed) {
          return
        }
        let addHook = $event.target
        Store.dispatch('changeBallPosition', addHook)
        Store.dispatch('addFoodsList', this.foodsItem)
        this.$nextTick(function () {
          Store.dispatch('dropBalls')
        })
        console.log('dd')
      },
      decreaseFoods: function ($event) {
        if (!$event._constructed) {
          return
        }
        Store.dispatch('desFoodsList', this.foodsItem)
        this.$emit('decreaseFoods')
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .card-wrapper
    display inline-block
    height 24px
    line-height 24px
    font-size 0
    & > .decrease
      vertical-align top
      transition all .5s
      transform translate3D(0, 0, 0)
      & > .inner
        display inline-block
        width 20px
        height 20px
        transition all .5s
        transform rotate(0)
      &.fade-enter, &.fade-leave-active
        opacity 0
        transform translate3D(12px, 0, 0)
        & > .inner
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
      display inline-block
      line-height 24px
      font-size 0
      vertical-align top
      & > .icon-add_circle, & > .icon-remove_circle_outline
        font-size 20px
        line-height 24px
        color: rgb(26, 161, 217)
</style>
