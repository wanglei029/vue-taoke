<template>
  <div class='goods-list-container'>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="item in list"
                :key="item"
                :title="item" />
    </van-list>
  </div>
</template>

<script>

export default {
  name: 'goods-list',
  props: {
    channel: {
      type: Object,
      required: true,
      default: () => { return {} }
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.goods-list-container {
  /* 设置列表滚动内容固定定位
    左右完全撑开
    设置 顶部 底部距离
  */
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
