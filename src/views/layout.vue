<template>
  <div class='layout-container'>
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏  开启路由模式 route-->
    <!-- placeholder 固定在底部时，是否在标签位置生成一个等高的占位元素 -->
    <van-tabbar v-model="active"
                active-color="#fe204a"
                inactive-color="#666"
                placeholder
                safe-area-inset-bottom
                route>
      <van-tabbar-item to='/'>
        <van-icon class="iconfont"
                  class-prefix='icon'
                  slot="icon"
                  slot-scope="props"
                  :name="props.active ?'home-fill':'home1'"></van-icon>
        <span>首页</span>
      </van-tabbar-item>
      <!-- <van-tabbar-item to='/'
                       icon-prefix="icon"
                       :icon="active?'shouye-o':'shouye'">首页</van-tabbar-item> -->
      <van-tabbar-item to="/nine"
                       icon-prefix="icon"
                       icon="991">9.9</van-tabbar-item>
      <van-tabbar-item to='/menu'>
        <van-icon class="iconfont"
                  class-prefix='icon'
                  slot="icon"
                  slot-scope="props"
                  :name="props.active ?'all-fill':'all'"></van-icon>
        <span>分类</span>
      </van-tabbar-item>
      <van-tabbar-item to='/collection'>
        <van-icon class="iconfont"
                  class-prefix='icon'
                  slot="icon"
                  slot-scope="props"
                  :name="props.active ?'favorites-fill':'favorites'"></van-icon>
        <span>收藏</span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <van-icon class="iconfont"
                  class-prefix='icon'
                  slot="icon"
                  slot-scope="props"
                  :name="props.active ?'account-fill':'account'"></van-icon>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'layout',
  props: {},
  components: {},
  data () {
    return {
      active: 0
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
.layout-container {
  /deep/ .van-tabbar-item__icon {
    .icon {
      font-size: 24px;
    }
  }
}
</style>
