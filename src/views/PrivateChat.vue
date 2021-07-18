<template>
  <div class="main_container">
    <div class="middle__content">
      <ChatList :initial-chats="chats" />
    </div>
    <div
      class="right__content"
    >
      <ChatRoom />
    </div>
  </div>
</template>
<script>
import ChatList from './../components/ChatList.vue'
import ChatRoom from './../components/ChatRoom.vue'
import { mapState } from 'vuex'

export default {
  name: 'PrivateChatViews',
  components: {
    ChatList,
    ChatRoom
  },
  data () {
    return {
      // 還沒用到
      isConnected: false,
      users: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.$socket.connect()
    this.$socket.emit('current user', { ...this.currentUser, socketId: this.$socket.id })
  },
  sockets: {
    connect () {
      console.log('socket connected in component')
      this.sockets.subscribe('user connected', (data) => {
        console.log('user connected', data)
      })
    },
    disconnect () {
      console.log('socket disconnected')
    },
    users: function (data) {
      this.users = data
      console.log('users data', data)
    }
  },
  beforeDestroy () {
    console.log('leave')
    this.$socket.disconnect()
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .main_container {
    display: grid;
    grid-template-columns: 2fr 4fr ;
    grid-template-areas: "middle right";
    .right__content{
      grid-area: right;
    }
    .middle__content{
      grid-area: middle
    }
  }
</style>
