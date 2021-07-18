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
  reconnectionDelay: 6000
}

const socket = io('https://infinite-mountain-11239.herokuapp.com/', socketOptions, { forceNew: true })

Vue.use(new VueSocketIO({
  debug: true,
  connection: socket
}))

new Vue({
  router,
  store,
  sockets: {
    connecting () {
      console.log('正在连接')
    },
    disconnect () {
      console.log('Socket 断开')
    },
    connect_failed () {
      console.log('连接失败')
    },
    connect () {
      console.log('socket connected')
    }
  },
  render: (h) => h(App)
}).$mount('#app')
