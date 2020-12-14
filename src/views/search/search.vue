<template>
  <div class='search-container'>
    <!-- 页面由4个部分组成 -->
    <!-- 1.搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，
    且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <!-- @focus="isResultShow=false" 当输入框获得焦点时关闭搜索结果 -->
    <form action="/">
      <van-search v-model="searchText"
                  @search="onSearch"
                  @cancel='$router.back()'
                  @focus="isResultShow=false"
                  show-action
                  placeholder="请输入搜索关键词" />
    </form>
    <!-- /1.搜索栏 -->
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"></search-result>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText"
                       :search-text='searchText'></search-suggestion>
    <!-- /联想建议 -->
    <!-- 历史记录 -->
    <search-history v-else></search-history>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
export default {
  name: 'search',
  props: {},
  components: { SearchSuggestion, SearchHistory, SearchResult },
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的显示状态
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    onSearch () {
      console.log('search')
      /* 触发搜索的时候显示搜索结果 */
      this.isResultShow = true
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.search-container {
}
</style>
