<template>
  <div class='home-container'>
    <van-nav-bar class="app-nav-bar">
      <!-- 通过插槽自定义中间的搜索按钮 -->
      <van-button slot="title"
                  icon="search"
                  class="search-btn"
                  round>搜索</van-button>
    </van-nav-bar>
    <!-- 商品分类列表 -->
    <!--
      line-height='0' 标题下面的线条
      title-active-color='#fe204a' 默认选中时的字体颜色
      swipeable 滑动切换
     -->
    <van-tabs v-model="active"
              line-height='0'
              title-active-color='#fe204a'
              swipeable>
      <van-tab :title="channel.cname"
               v-for='channel in channels'
               :key="channel.cid">
        <home-list v-if="channel.cid===-1"></home-list>
        <!-- 根据商品分类的不同id加载不同组件数据 -->
        <goods-list v-else
                    :channel='channel'></goods-list>
      </van-tab>
    </van-tabs>
    <!--/ 商品分类列表 -->

  </div>
</template>

<script>
import { getSuperCategory } from '@/api/goods'
import GoodsList from './components/goods-list'
import HomeList from './components/home-list'
export default {
  name: 'home',
  props: {},
  components: { GoodsList, HomeList },
  data () {
    return {
      active: 0,
      channels: [] // 商品分类
    }
  },

  computed: {},

  created () {
    /* 加载商品分类 */
    this.loadSuperCategory()
  },

  mounted () { },

  methods: {
    /* 获取商品分类 */
    async loadSuperCategory () {
      const { data } = await getSuperCategory()
      this.channels = [{ cid: -1, cname: '精选' }, ...data.data]
      // console.log(data)
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.home-container {
  /* vant中定义的宽度为60% 需要手动覆盖 */
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    background: #f5f7f9;
    width: 277px;
    height: 32px;
    border: none;
    /* 搜索图标 */
    .van-icon {
      font-size: 18px;
      color: #fe204a;
    }
    .van-button__text {
      font-size: 14px;
      color: #ccc;
    }
  }
}
</style>
