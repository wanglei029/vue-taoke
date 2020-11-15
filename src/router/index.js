import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nine',
    name: 'Nine',
    component: () => import('../views/nine/nine.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
