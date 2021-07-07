import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/user/1/followings',
    name: 'user-followings',
    component: () => import('./../views/UserFollowings.vue')
  },
  {
    path: '/user/1/followers',
    name: 'user-followers',
    component: () => import('./../views/UserFollowers.vue')
  },
  {
    path: '/',
    name: 'root'
  }
]
const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})
export default router
