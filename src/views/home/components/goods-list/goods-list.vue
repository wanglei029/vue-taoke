<template>
  <div class="list-container">
    <van-list v-if="list"
              class="goods-list">
      <good-item v-for="item in list"
                 :goods="item"
                 :key="item.id"
                 class="goods-item"></good-item>
      <div slot="loading">
        <span>加载中……</span>
      </div>
    </van-list>
    <van-pull-refresh v-else
                      v-model="isRefreshLoading"
                      :success-text="refreshSuccessText"
                      success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="goods-list">
        <good-item v-for="(item,index) in goods"
                   :goods="item"
                   :key="`${index}-${item.id}`"
                   class="goods-item"></good-item>
        <!-- <div slot="loading"
             class="loading-container">
          <span>加载中……</span>
        </div> -->
      </van-list>
    </van-pull-refresh>
    <!-- 返回顶部 -->
    <scroll-top ref="refScrollTop"
                v-show="isBackTopShow"
                @backTop="scrollTop"></scroll-top>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
import GoodItem from '@/components/goods-item/goods-item'
import ScrollTop from '@/components/scroll-top/scroll-top'
import { throttle } from 'lodash'
export default {
  name: 'goodList',
  props: {
    category: {
      type: Object,
      required: false
    },
    list: {
      type: Array,
      required: false
    }
  },
  components: { GoodItem, ScrollTop },
  data () {
    return {
      goods: [],
      loading: false,
      finished: false,
      pageId: null,
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: '',
      isBackTopShow: false
    }
  },

  computed: {},

  created () { },

  mounted () {
    this.bindScroll()
  },

  methods: {
    async onLoad () {
      // 异步更新数据
      const params = {
        cids: this.category.cid,
        pageId: this.pageId,
        pageSize: 10
      }
      try {
        console.log(params)
        const { data } = await getGoodsList(params)
        const { list, pageId } = data.data
        console.log(data)
        this.goods.push(...list)
        this.loading = false
        /* 如果还有下一页获取更新下一页的页码 */
        if (list.length > 0) {
          console.log(pageId)
          this.pageId = pageId
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onRefresh () {
      console.log('下拉刷新')
      const params = {
        cids: this.category.cid,
        pageId: this.pageId || 1,
        pageSize: 10
      }
      const { data } = await getGoodsList(params)
      // eslint-disable-next-line no-unused-vars
      const { list, pageId } = data.data
      this.goods.push(...list)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${list.length}条数据`
    },
    scrollTop () {
      const wrapper = document.getElementsByClassName('list-container')
      wrapper.forEach(item => { item.scrollTop = 0 })
    },
    // throttle (callback, delay) {
    //   let start = 0 // 必须保存第一次点击立即调用
    //   return function () { // 它的this是谁就得让callback()中的this是谁, 它接收的所有实参都直接交给callback()
    //     console.log('throttle 事件')
    //     const current = Date.now()
    //     if (current - start > delay) { // 从第2次点击开始, 需要间隔时间超过delay
    //       callback.apply(this, arguments)
    //       start = current
    //     }
    //   }
    // },
    debounce (callback, delay) {
      return function () {
        console.log('debounce 事件...')
        // 保存this和arguments
        const that = this
        const args = arguments

        // 清除待执行的定时器任务
        if (callback.timeoutId) {
          clearTimeout(callback.timeoutId)
        }
        // 每隔delay的时间, 启动一个新的延迟定时器, 去准备调用callback
        callback.timeoutId = setTimeout(function () {
          callback.apply(that, args)
          // 如果定时器回调执行了, 删除标记
          delete callback.timeoutId
        }, delay)
      }
    },
    bindScroll () {
      const wrapper = document.getElementsByClassName('list-container')

      console.log('页面滚动', wrapper)
      wrapper.forEach(item => {
        item.addEventListener('scroll', throttle(() => {
          console.log('页面滚动', item.scrollTop)
          if (item.scrollTop < 400) {
            this.isBackTopShow = false
          } else {
            this.isBackTopShow = true
          }
        }, 200))
      })
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.list-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
  .goods-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // background: #c000e8;
    padding: 10px 10px;
    padding-top: 0px;
    .goods-item {
      width: 49%;
    }
    /deep/ .van-list__loading {
      width: 100%;
    }
  }
}
</style>
