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
  {
    path: '/reply',
    name: 'reply',
    component: () => import('./../components/ReplyPostModal.vue')
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
        path: ':id/followings',
        name: 'user-followings',
        component: () => import('./../views/UserFollowings.vue')
      },
      {
        path: ':id/followers',
        name: 'user-followers',
        component: () => import('./../views/UserFollowers.vue')
      },
      {
        path: ':id/tweets',
        name: 'user-tweets',
        component: () => import('./../views/UserTweets.vue')
      },
      {
        path: ':id/likes',
        name: 'user-likes',
        component: () => import('./../views/UserLikes.vue')
      },
      {
        path: ':id/replies',
        name: 'user-replies',
        component: () => import('./../views/UserReplies.vue')
      },
      {
        path: '/detail/:id',
        name: 'detail-tweet',
        component: () => import('./../views/DetailTweet.vue'),
        children: [
          {
            path: '/user/replied/:id',
            name: 'reply-post-modal',
            component: () => import('./../components/ReplyPostModal.vue')
          }]
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
        component: () => import('./../views/AdminUsers.vue')
      }
    ]
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
