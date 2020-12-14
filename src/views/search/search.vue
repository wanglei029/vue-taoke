<template>
  <div class='search-container'>
    <!-- 页面由4个部分组成 -->
    <!-- 1.搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，
    且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search v-model="searchText"
                  @search="onSearch"
                  @cancel='$router.back()'
                  show-action
                  placeholder="请输入搜索关键词" />
    </form>
    <!-- /1.搜索栏 -->
    <!-- 联想建议 -->
    <search-suggestion></search-suggestion>
    <!-- /联想建议 -->
    <!-- 历史记录 -->
    <search-history></search-history>
    <!-- /历史记录 -->
    <!-- 搜索结果 -->
    <search-result></search-result>
    <!-- /搜索结果 -->
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
      searchText: ''
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    onSearch () {
      console.log('search')
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.search-container {
}
</style>
