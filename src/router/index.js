import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/home')
      },
      {
        path: '/nine',
        name: 'nine',
        component: () => import('@/views/nine/nine')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/menu')
      },
      {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/collection')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my')
      }
    ]
  },
  {
    path: '/goods/:goodsId/:id',
    name: 'Goods',
    component: () => import('@/views/goods/goods')
  }
]

const router = new VueRouter({
  routes
})

export default router
