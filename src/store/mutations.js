/* 定义修改的操作 */
import * as types from './mutation-types'
/* mutation相关的修改方法
  为什么使用mutation-types 为了便于书写方便
  以及一些lint工具是可以帮助检查写的对不对
*/
const mutations = {
  [types.SET_GOODS] (state, goods) {
    state.goods = goods
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  }
}
export default mutations