import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/reset.scss'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import { io } from 'socket.io-client'

Vue.config.productionTip = false
const socketOptions = {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  forceNew: true,
  allowUpgrades: false,
  pingTimeout: 30000

}

const socket = io('https://infinite-mountain-11239.herokuapp.com/', socketOptions)

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

const tryReconnect = () => {
  setTimeout(() => {
    socket.io.open((err) => {
      if (err) {
        tryReconnect()
      }
    })
  }, 2000)
}
new Vue({
  router,
  store,
  sockets: {
    connecting () {
      console.log('Socket connecting')
    },
    disconnect () {
      console.log('Socket Disconnect')
      tryReconnect()
    },
    connect_failed () {
      console.log('Socket connect failed')
    },
    connect () {
      console.log('socket connected in main.js')
      console.log(socket.id)
      this.sockets.subscribe('messageNotify', (data) => {
        console.log('messageNotifydata in main.js', data)
      })
    },
    messageNotify: function (data) {
      console.log('messageNotifydata', data)
    }

  },
  render: (h) => h(App)
}).$mount('#app')

export default socket
