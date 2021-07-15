import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store'
Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/admin/login')
  }
  next()
}
const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.isAdmin) {
    next('/login')
  }
  next()
}

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
    path: '/user/:id',
    name: 'user-personal-page',
    component: () => import('./../views/UserPersonalPage.vue'),
    beforeEnter: authorizeIsUser,
    children: [
      {
        path: 'tweets',
        name: 'user-tweets',
        component: () => import('./../views/UserTweets.vue')
      },
      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('./../views/UserLikes.vue')
      },
      {
        path: 'replies',
        name: 'user-replies',
        component: () => import('./../views/UserReplies.vue')
      }
    ]
  },
  // 以下路由會包含 TopUsersList / SideNavBar
  {
    path: '/user',
    name: 'user',
    component: () => import('./../views/user.vue'),
    beforeEnter: authorizeIsUser,
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
        name: 'main-page',
        component: () => import('./../views/MainPage.vue'),
        children: [
          {
            path: '/replied/:id',
            name: 'main-reply-post-modal',
            component: () => import('./../components/ReplyPostModal.vue')
          },
          {
            path: '/new',
            name: 'new-tweet',
            component: () => import('./../components/NewPostModal.vue')
          }

        ]
      }
    ]
  },
  // 以下路由會包含 SideNavBar
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/tweets',
    component: () => import('./../views/Admin.vue'),
    beforeEnter: authorizeIsAdmin,
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
    name: 'root',
    redirect: '/login'
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('./../views/NotFound')
  }
]
const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInstore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  const isAdmin = store.state.currentUser.isAdmin
  // 比較 localStorage 和 store 中的 token 是否一樣
  console.log('isAdmin', isAdmin === false)
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInstore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  const pathsWithoutAuthentication = ['signup', 'login', 'admin-login']
  const pathNeedAdminRole = ['admin', 'admin-tweets', 'admin-users']
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }
  // 如果 token 有效則轉址到首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/mainpage')
    return
  }
  // user 不能進入 Admin 頁面，反之亦然
  if (pathNeedAdminRole.includes(to.name) && !isAdmin) {
    next('/')
  }
  if (!pathNeedAdminRole.includes(to.name) && isAdmin) {
    next('/admin')
  }
  next()
})

export default router
