import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/home'),
        meta: { requiresAuth: false }
      },
      /* 九块九 */
      {
        path: '/nine',
        name: 'nine',
        component: () => import('@/views/nine/nine'),
        meta: { requiresAuth: false }
      },
      /* 分类 */
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/menu'),
        meta: { requiresAuth: false }
      },
      /* 收藏 */
      {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/collection'),
        meta: { requiresAuth: true }
      },
      /* 我的 */
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my'),
        meta: { requiresAuth: false }
      }
    ]
  },
  /* 商品详情页 */
  {
    path: '/goods/:goodsId/:id',
    name: 'Goods',
    component: () => import('@/views/goods/goods'),
    meta: { requiresAuth: false }
  },
  /* 搜索 */
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/search'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 如果已经登录 直接放行
    if (store.state.user) {
      return next()
    }
    // 没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    })
      .then(() => {
        // on confirm
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // on cancel 中断路由导航
        next(false)
      })
  } else {
    // 不需要登录状态的页面，直接放行
    next()
  }
})
export default router
