import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/reset.scss'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import { io } from 'socket.io-client'

Vue.config.productionTip = false
const socketOptions = {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  forceNew: true,
  allowUpgrades: false,
  pingTimeout: 30000
}

const socket = io('https://3adc67cac52e.ngrok.io/', socketOptions, { transports: ['websocket', 'polling'], forceNew: true })
socket.onAny((event, ...args) => {
  console.log('main.js收到的資訊', event, args)
})

Vue.use(new VueSocketIO({
  debug: true,
  connection: socket,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  sockets: {
    connecting () {
      console.log('main.js Socket connecting')
    },
    disconnect () {
      console.log('main.js Socket Disconnect')
    },
    connect_failed () {
      console.log('main.js Socket connect failed')
    },
    connect () {
      console.log('main.js socket connected in main.js')
    },
    messageNotify: function (data) {
      console.log('main.js messageNotifydata', data)
    },
    subscribeNotify: function (data) {
      console.log('main.js subscribeNotify', data)
    },
    reactionNotify: function (data) {
      console.log('main.js reactionNotify', data)
    }
  },
  render: (h) => h(App)
}).$mount('#app')

export default socket
