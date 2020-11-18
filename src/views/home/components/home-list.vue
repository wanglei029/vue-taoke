<template>
  <div class='home-list-container'>
    <!-- 1:轮播图 -->
    <div class="swipe-wraper">
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(activity, index) in activities"
                        :key="index">
          <a :href="activity"></a>
          <van-image class="active-img"
                     :src="activity.materialLink" />
        </van-swipe-item>
      </van-swipe>
      <div class="bg-placeholder"></div>
    </div>

  </div>
</template>

<script>
import {
  getActivity
  // getActivityLink
} from '@/api/goods'
export default {
  name: 'home-list',
  props: {},
  components: {},
  data () {
    return {
      activities: []
    }
  },

  computed: {},

  created () {
    this.loadActivity()
  },

  mounted () {

  },

  methods: {
    async loadActivity () {
      const { data } = await getActivity()
      console.log(data)
      const activities = data.data.slice(0, 5)
      // activities.forEach((item, index, arr) => { })
      // activities.map((item) => { })
      this.activities = activities
      // this.activities = activities.map(async (item) => {
      //   console.log(item.promotionSceneId)
      //   const { data } = await getActivityLink({
      //     promotionSceneId: item.promotionSceneId
      //   })
      //   console.log(data)
      // })
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.home-list-container {
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
  .swipe-wraper {
    position: relative;
    .van-swipe {
      z-index: 1;
      .active-img {
        width: 355px;
        height: 140px;
        display: flex;
        margin: 0 auto;
        /deep/ .van-image__img {
          border-radius: 9px;
        }
      }
    }
    .bg-placeholder {
      width: 100%;
      height: 140px;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      background-color: @bgColor;
      // transform: translateY(-180px);
      position: absolute;
      top: 0;
    }
  }
}
</style>
