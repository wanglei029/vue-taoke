import { loadSearch, loadPlay, loadFavorite } from '@/utils/cache'
/* 管理所有的状态 */
const state = {
  goods: {},
  /* 收藏列表 */
  favoriteList: loadFavorite()
}
export default state
