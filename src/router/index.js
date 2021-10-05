import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import('../views/Group.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
