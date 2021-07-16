import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/reset.scss'
import store from './store'
import VueSocketIo from 'vue-socket.io'
import SocketIo from 'socket.io-client'

Vue.use(new VueSocketIo({
  debug: true,
  connection: SocketIo('infinite-mountain-11239.herokuapp.com/socket.io/?EIO=4&transport=websocket', { transports: ['websocket'] }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '' }
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
