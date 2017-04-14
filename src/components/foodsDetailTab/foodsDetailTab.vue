<template>
  <div class="detailTab-wrapper">
    <section class="pic-wrapper" ref="picWrapper">
      <img :src="foodItem.image">
      <p class="food-desc">{{foodItem.description}}</p>
    </section>
    <div class="food-detail">
      <p class="food-name">{{foodItem.name}}</p>
      <p class="food-sell">月售{{foodItem.sellCount}}份 好评率{{foodItem.rating}}%</p>
      <section class="food-more">
        <p class="food-price">¥{{foodItem.price}}</p>
        <div v-if="foodItem.checkNum===0">
          <span class="add-food" @click="addToCar(foodItem,$event)">加入购物车</span>
        </div>
        <div v-else>
          <shop-card :foodsItem="foodItem"></shop-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import shopCard from 'components/cardShop/cardShop'
  import Store from '../../vuex/store'
  export default {
    props: ['foodItem'],
    mounted() {
      console.log('mounted')
    },
    methods: {
      addToCar(foodItem, $event) {
        this.$emit('addToCar', $event)
        Store.dispatch('addFoodsList', foodItem)
      }
    },
    components: {
      'shopCard': shopCard
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .detailTab-wrapper
    font-size 0
    .pic-wrapper
      position relative
      img
        display block
        width 100%
        height 100%
      .food-desc
        width 100%
        text-align center
        position absolute
        bottom 5px
        display block
        font-size 10px
        font-weight 200
        color #fff
    .food-detail
      background #fff
      padding 13px 10px 10px 15px
      & > .food-name
        font-size 14px
        margin-bottom 10px
      & > .food-sell
        font-size 10px
        font-weight 200
        margin-bottom 26px
      & > .food-more
        display flex
        justify-content space-between
        div
          display inline-block
          & > .add-food
            font-size 12px
            padding 5px
            background rgb(55, 146, 229)
            color #fff
            -webkit-border-radius: 8px
            -moz-border-radius: 8px
            border-radius: 8px
        & > .food-price
          font-size 14px
          color #ff6000
</style>
