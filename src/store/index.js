import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      avatar: '',
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
    }
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
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, account, avatar, isAdmin } = data
        console.log(data)
        commit('setCurrentUser', {
          id,
          name,
          account,
          avatar,
          isAdmin
        })
        return true
      } catch (error) {
        console.error('can not fetch user information')
        // 若發生錯誤則直接登出
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {}
})
