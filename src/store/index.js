import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFollowing: false,
    currentUser: {
      id: -1,
      name: '',
      account: '',
      avatar: '',
      email: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: '',
    followingNum: 0,
    getPrivateNotify: false,
    getPrivateNotifyCount: 0,
    privateChatUser: {
      id: -1,
      name: '',
      account: ''
    },
    subscribeNotifyData: {
      id: -1,
      avatar: '',
      name: '',
      content: '',
      labelName: ''
    },
    subscribeNotification: false,
    screenSize: 'bigScreen'
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    SOCKET_messageNotify (state, data) {
      if (data.unreadCount > 0) {
        state.getPrivateNotify = true
      } else {
        state.getPrivateNotify = false
      }
      state.getPrivateNotifyCount = data.unreadCount
      console.log('state.getPrivateNotify', data)
    },
    SOCKET_subscribeNotify (state, data) {
      if (Object.keys(data).length > 0) {
        state.subscribeNotifyData = data
        state.subscribeNotification = true
      } else {
        state.subscribeNotification = false
      }
    },
    SOCKET_reactionNotify (state, data) {
      if (Object.keys(data).length > 0) {
        state.subscribeNotifyData = data
        state.subscribeNotification = true
      } else {
        state.subscribeNotification = false
      }
    },
    changeSubscribeNotification (state) {
      state.subscribeNotification = false
    },
    // 登出狀態
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    addFollowing (state) {
      state.followingNum++
    },
    minusFollowing (state) {
      state.followingNum--
    },
    getUserInfo (state, privateChatUser) {
      state.privateChatUser = {
        ...state.privateChatUser,
        ...privateChatUser
      }
    },
    changeScreen (state, screenSize) {
      state.screenSize = screenSize
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, account, avatar, isAdmin, email } = data
        commit('setCurrentUser', {
          id,
          name,
          account,
          avatar,
          email,
          isAdmin
        })
        return true
      } catch (error) {
        console.error('can not fetch user information')
        // 若發生錯誤則直接登出
        commit('revokeAuthentication')
        return false
      }
    },
    updateSubscribeNotification ({ commit }) {
      commit('changeSubscribeNotification')
    }
  },
  modules: {}
})
