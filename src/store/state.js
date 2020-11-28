import { loadSearch, loadBrowsing, loadFavorite } from '@/utils/cache'
/* 管理所有的状态 */
const state = {
  goods: {},
  /* 浏览历史列表 */
  browsingList: loadBrowsing(),
  /* 收藏列表 */
  favoriteList: loadFavorite()
}
export default state
