import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./../components/LoginForm.vue')
  },
  // 以下路由會包含 TopUsersList / TopNavbar / SideNavBar
  {
    path: '/user',
    name: 'user',
    component: () => import('./../views/user.vue'),
    children: [
      {
        path: '1/followings',
        name: 'user-followings',
        component: () => import('./../views/UserFollowings.vue')
      },
      {
        path: '1/followers',
        name: 'user-followers',
        component: () => import('./../views/UserFollowers.vue')
      }
    ]
  },
  // 這邊還會有 admin 的

  // {
  //   path: '/user/1/followings',
  //   name: 'user-followings',
  //   component: () => import('./../views/UserFollowings.vue')
  // },
  // {
  //   path: '/user/1/followers',
  //   name: 'user-followers',
  //   component: () => import('./../views/UserFollowers.vue')
  // },
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
