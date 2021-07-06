import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('../components/Post.vue')
  }
]
const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})
export default router
