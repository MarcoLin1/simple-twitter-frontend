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
    path: '/setting',
    name: 'setting',
    component: () => import('./../views/Setting.vue')
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
        path: '1/tweets',
        name: 'user-tweets',
        component: () => import('./../views/UserTweets.vue')
      },
      {
        path: '1/likes',
        name: 'user-likes',
        component: () => import('./../views/UserLikes.vue')
      },
      {
        path: '1/replies',
        name: 'user-replies',
        component: () => import('./../views/UserReplies.vue')
      },
      {
        path: '2/tweets',
        name: 'user-tweets',
        component: () => import('./../views/UserTweets.vue')
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
        component: () => import('./../components/AdminTweetsList.vue')
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
