import request from '@/utils/request'

/**
 * 九宫格导航图标
 */
export function getGridIcons () {
  return request({
    method: 'GET',
    url: 'http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new?entityId=4&modelId=17922&proModelId=2&source=3&version=v1&tuserId=1206917&isWechat=0'
  })
}
/**
 * 热门活动
 */
export function getActivity (params) {
  return request({
    method: 'GET',
    url: '/api/category/get-tb-topic-list',
    params
  })
}
/**
 * 官方活动会场转链
 */
export function getActivityLink (params) {
  return request({
    method: 'GET',
    url: '/api/tb-service/activity-link',
    params
  })
}

/**
 * 获取商品列表
 */
export function getGoodsList (params) {
  return request({
    method: 'GET',
    url: '/api/goods/get-goods-list',
    params
  })
}
/**
 * 获取直播好货
 */
export function getLiveMaterialGoodsList (params) {
  return request({
    method: 'GET',
    url: '/api/goods/liveMaterial-goods-list',
    params
  })
}
/**
 * 获取爆款商品
 */
export function getExplosiveGoodsList (params) {
  return request({
    method: 'GET',
    url: 'api/goods/explosive-goods-list',
    params
  })
}
/**
 * 获取单品详情
 */
export const getGoodsDetails = (params) => {
  return request({
    method: 'GET',
    url: 'api/goods/get-goods-details',
    params
  })
}
/**
 * 获取单品详情
 */
export const getSimilerGoods = (params) => {
  return request({
    method: 'GET',
    url: '/api/goods/list-similer-goods-by-open',
    params
  })
}
/**
 * 获取我的收藏列表
 */
export function getCollectionList (params) {
  return request({
    method: 'GET',
    url: '/api/goods/get-collection-list',
    params
  })
}
/**
 * 获取超级分类
 */
export function getSuperCategory (params) {
  return request({
    method: 'GET',
    url: '/api/category/get-super-category',
    params
  })
}
/**
 * 获取搜索联想词
 */
export function getSearchSuggestions (params) {
  return request({
    method: 'GET',
    url: '/api/goods/search-suggestion',
    params
  })
}
/* 获取搜索结果 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/api/goods/get-dtk-search-goods',
    params
  })
}
/* 获取热搜记录 */
export const getHotSearch = () => {
  return request({
    method: 'GET',
    url: '/api/category/get-top100'
  })
}
/* 获取热搜记录 */
export const getRecommend = () => {
  return request({
    method: 'GET',
    url: 'http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new?entityId=4&modelId=-1&proModelId=1&source=3&version=v1&tuserId=1206917&isWechat=0'
  })
}
