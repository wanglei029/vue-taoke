<template>
  <div class='home-container'>
    <van-nav-bar class="app-nav-bar">
      <!-- 通过插槽自定义中间的搜索按钮 -->
      <van-button slot="title"
                  icon="search"
                  class="search-btn"
                  round>搜索</van-button>
    </van-nav-bar>
  </div>
</template>

<script>

export default {
  name: 'home',
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
