import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./../components/LoginForm.vue')
  },
  {
    path: '/user/1/tweets',
    name: 'user-tweets',
    component: () => import('./../views/UserTweets.vue')
  },
  {
    path: '/user/1/likes',
    name: 'user-likes',
    component: () => import('./../views/UserLikes.vue')
  },
  {
    path: '/user/1/replies',
    name: 'user-replies',
    component: () => import('./../views/UserReplies.vue')
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
