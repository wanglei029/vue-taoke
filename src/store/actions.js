import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from '@/utils/cache'
/* 异步操作 或者对mutation做一些封装 */
/* 当点击收藏的时候触发 */
export const saveFavoriteList = function ({ commit }, goods) {
  /* saveFavorite(goods) 会返回新的数组 新的数组就会更新到state中 */
  commit(types.SET_FAVORITE_LIST, saveFavorite(goods))
}
export const deleteFavoriteList = function ({ commit }, goods) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(goods))
}
