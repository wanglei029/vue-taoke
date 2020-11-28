<template>
  <div class='toggle-bar-container'>
    <van-tabs type="card"
              v-model="activeName">
      <van-tab title="收藏列表"
               class='app-nav-bar'
               name="favorite">
        <goods-list :list='favoriteList'></goods-list>
      </van-tab>
      <van-tab title="浏览记录"
               name="browsing">
        <goods-list :list='browsingList'></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

export default {
  name: 'toggle-bar',
  props: {},
  components: {},
  data () {
    return {

    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='less' scoped>
.toggle-bar-container {
}
</style>
