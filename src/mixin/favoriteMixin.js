/* 定义收藏的公用方法 */
import { mapGetters, mapMutations, mapActions } from 'vuex'

export const favoriteMixin = {
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  methods: {
    toggleFavorite (goods) {
      this.isFavoriteLoading = true
      console.log(this.isFavorite(goods))
      if (this.isFavorite(goods)) {
        // 已经关注就取消收藏
        this.deleteFavoriteList(goods)
      } else {
        // 未关注就添加收藏
        this.saveFavoriteList(goods)
      }
      // this.article.is_followed = !this.article.is_followed
      this.isFavoriteLoading = false
    },
    /* 查看当前商品是否在favoriteList中 */
    isFavorite (goods) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === goods.id
      })
      /* 如果index大于-1说明当前商品已经被收藏了 */
      return index > -1
    },
    ...mapActions(['saveFavoriteList', 'deleteFavoriteList'])
  }

}
