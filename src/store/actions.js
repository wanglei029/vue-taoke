import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch, saveBrowsing, saveFavorite, deleteFavorite, saveUsers, saveUser, deleteCurrentUser } from '@/utils/cache'
/* 异步操作 或者对mutation做一些封装 */
/* 当点击收藏的时候触发 */
export const saveBrowsingList = function ({ commit }, goods) {
  /* saveFavorite(goods) 会返回新的数组 新的数组就会更新到state中 */
  commit(types.SET_BROWSING_LIST, saveBrowsing(goods))
}
// export const deleteBrowsingList = function ({ commit }, goods) {
//   commit(types.SET_BROWSING_LIST, deleteBrowsing(goods))
// }
/* 当点击收藏的时候触发 */
export const saveFavoriteList = function ({ commit }, goods) {
  /* saveFavorite(goods) 会返回新的数组 新的数组就会更新到state中 */
  commit(types.SET_FAVORITE_LIST, saveFavorite(goods))
}
export const deleteFavoriteList = function ({ commit }, goods) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(goods))
}
export const saveUserList = function ({ commit }, user) {
  /* saveUser(user) 会返回新的数组 新的数组就会更新到state中 */
  commit(types.SET_USER_LIST, saveUsers(user))
}
export const saveCurrentUser = function ({ commit }, user) {
  /* saveUser(user) 会返回新的数组 新的数组就会更新到state中 */
  commit(types.SET_CURRENT_USER, saveUser(user))
}
export const delCurrentUser = function ({ commit }, user) {
  /* saveUser(user) 会返回新的数组 新的数组就会更新到state中 */
  commit(types.SET_CURRENT_USER, deleteCurrentUser())
}
