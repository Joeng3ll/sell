<template>
  <div class="goodsList-wrapper">
    <!--餐品总名-->
    <header class="goodsList-name">{{goodsList.name}}</header>
    <!--餐品列表-->
    <article class="goodsList-content">
      <section v-for="item in goodsList.foods" class="goodsList-item">
        <img :src="item.image" width="60px" height="60px" class="foods-avator">
        <div class="foods-detail">
          <p class="foods-name">{{item.name}}</p>
          <p class="foods-description">{{item.description}}</p>
          <p class="foods-rating">月售{{item.sellCount}}份 <span>好评率{{item.rating}}%</span></p>
          <p class="foods-price">¥<strong>{{item.price}}</strong><span class="foods-oldPrice" v-if="item.oldPrice!==''">¥<strong>{{item.oldPrice}}</strong></span>
          </p>
        </div>
        <div class="foods-count">
          <span @click="decreaseFoods(item)"><i class="icon-remove_circle_outline" v-if="item.checkNum>0"></i></span>
          <p v-if="item.checkNum>0">{{item.checkNum}}</p>
          <span @click="addFoods(item)"><i class="icon-add_circle"></i></span>
        </div>
      </section>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    data () {
      return {}
    },
    props: ['goodsList'],
    computed: {},
    created() {
      this.goodsList.foods.forEach(function (item, index) {
        if (typeof item.checkNum === 'undefined') {
          Vue.set(item, 'checkNum', 0)
        }
      })
    },
    methods: {
      addFoods: function (item) {
        item.checkNum++
      },
      decreaseFoods: function (item) {
        item.checkNum--
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goodsList-wrapper
    & > .goodsList-name
      display block
      height 26px
      line-height 26px
      color rgb(147, 153, 159)
      background #f3f5f7
      font-size 12px
      border-left 2px solid #d9dde1
      padding-left 12px
    & > .goodsList-content
      padding 0 18px
      & > .goodsList-item
        display flex
        padding 18px 0
        position relative
        &:not(:last-child)
          border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        & > .foods-avator
          display inline-block
          vertical-align top
          margin-right 10px
        & > .foods-detail
          display inline-block
          font-size 0
          font-weight 200
          padding 2px 0 0 0
          & > .foods-name
            font-size 14px
            color rgb(7, 17, 27)
          & > .foods-name, & > .foods-description, & > .foods-rating
            margin-bottom 8px
          & > .foods-description, & > .foods-rating
            font-size 10px
            color rgb(147, 153, 159)
          & > .foods-price
            font-size 10px
            color rgb(240, 20, 20)
            font-weight 350
            & > strong
              font-size 14px
              font-weight 700
            & > .foods-oldPrice
              font-size 10px
              color rgb(147, 153, 159)
              margin-left 8px
              text-decoration line-through
              & > strong
                font-weight 700
        & > .foods-count
          display flex
          position absolute
          bottom 12px
          right 0
          height 24px
          line-height 24px
          & > p
            font-size 12px
            display inline-block
            color rgb(147,153,159)
            width 24px
            height 24px
            text-align center
            line-height 24px
          & > span
            & > .icon-add_circle, & > .icon-remove_circle_outline
              font-size 20px
              line-height 24px
              color: rgb(26, 161, 217)
              vertical-align top
    & > p, image
      display inline-block
</style>
