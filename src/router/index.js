import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('./../views/AdminLogin.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('./../views/Register.vue')
  },
  // 以下路由會包含 TopUsersList / SideNavBar
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
      },
      {
        path: '/detail/:id',
        name: 'detail-tweet',
        component: () => import('./../views/DetailTweet.vue')
      },
      {
        path: '/mainpage',
        name: 'mainpage',
        component: () => import('./../views/MainPage.vue')
      }
    ]
  },
  // 以下路由會包含 SideNavBar
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./../views/Admin.vue'),
    children: [
      {
        path: 'tweets',
        name: 'admin-tweets',
        component: () => import('./../views/AdminTweets.vue')
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('./../components/AdminUserCard.vue')
      }
    ]
  },
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
