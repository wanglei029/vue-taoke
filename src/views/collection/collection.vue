<template>
  <div class='collection-container'>
    <van-nav-bar class='app-nav-bar'
                 title="收藏/足迹"
                 left-arrow
                 @click-left="$router.back()" />
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
import GoodsList from '@/components/goods-list/goods-list'
// import GoodsList from '../home/components/goods-list.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'collection',
  props: {
  },
  components: { GoodsList },
  data () {
    return {
      // activeName: this.$router.params.activeName
      // activeName: 'browsing'
    }
  },

  computed: {
    ...mapGetters([
      'favoriteList',
      'browsingList'])
  },

  created () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='less' scoped>
.collection-container {
  /deep/.van-tabs__nav {
    .van-tab--active {
      background-image: linear-gradient(to bottom, @bgColor, #fe3b35);
      // color: #fff;
    }
  }
}
</style>
