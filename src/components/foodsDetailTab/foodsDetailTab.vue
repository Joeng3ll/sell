<template>
  <div class="detailTab-wrapper">
    <section class="pic-wrapper" ref="picWrapper">
      <img :src="foodItem.image" width="320px" height="320px">
      <p class="food-desc">{{foodItem.description}}</p>
    </section>
    <div class="food-detail">
      <p class="food-name">{{foodItem.name}}</p>
      <p class="food-sell">月售{{foodItem.sellCount}}份 好评率{{foodItem.rating}}%</p>
      <section class="food-more">
        <p class="food-price">{{foodItem.price}}</p>
        <span>加入购物车</span>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['foodItem'],
    mounted() {
      console.log('mounted')
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .detailTab-wrapper
    font-size 0
    .pic-wrapper
      position relative
      .img
        display block
      .food-desc
        position relative
        display inline-block
        margin -20px 50% 0 0
        font-size 10px
        color #fff
    .food-detail
      background #fff
      &>.food-name
        font-size 14px
      &>.food-sell
        font-size 10px
        font-weight 200
      &>.food-more
        &>.food-price
          font-size 14px
          color #ff6000
</style>
