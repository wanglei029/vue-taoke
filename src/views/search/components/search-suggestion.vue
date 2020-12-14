<template>
  <div class='search-suggestion-container'>
    <van-cell v-for="(suggest,index) of suggestions"
              :title="suggest.kw"
              :key="index"
              icon="search" />
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/goods'
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      request: true
    }
  },
  components: {},
  data () {
    return {
      suggestions: []
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {},

  watch: {
    /* 在子组件中监视搜索框输入内容的变化，如果变化则请求获取联想建议数据 */
    // searchText (newVal, oldVal) {
    //   console.log(newVal, oldVal)
    // }
    /* 监视的完整写法 组件第一次渲染就触发 */
    searchText: {
      async handler (newVal, oldVal) {
        // console.log(newVal, oldVal)
        const params = {
          keyWords: newVal,
          type: 1
        }
        const { data } = await getSearchSuggestions(params)
        this.suggestions = data.data
        console.log(this.suggestions)
      },
      immediate: true // 设置此属性，回调将会在侦听开始之后被立即调用
    }
  }

}

</script>
<style lang='less' scoped>
.search-suggestion-container {
}
</style>
