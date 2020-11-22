import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteList: [] // 收藏列表
  },
  mutations: {
    SET_FAVORITELIST (state, list) {
      state.favoriteList = list
    }
  },
  actions: {
    saveFavoriteList ({ commit }, goods) {

    },
    deleteFavoriteList ({ commit }, goods) {

    }
  },
  modules: {
  }
})
