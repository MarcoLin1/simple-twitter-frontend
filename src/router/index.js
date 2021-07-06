import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
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
