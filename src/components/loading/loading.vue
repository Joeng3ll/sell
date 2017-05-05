<template>
  <div class="loading-wrapper">
    loading...
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
//        $router和$route $router是当前根实例下的router配置 $route是当前激活的路由对象
      console.log(this.$router)
      setTimeout(() => this.$router.push('/goods'), 2000)
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loading-wrapper
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    background rgba(255, 255, 255, 0.2)
</style>
