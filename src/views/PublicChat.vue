<template>
  <div class="main_container">
    <div class="middle__content">
      <OnlineUser :initial-users="users" />
    </div>
    <div
      class="right__content"
      @after-submit="handleAfterSubmit"
    >
      <ChatRoom :new-user="newUser" />
    </div>
  </div>
</template>
<script>
import OnlineUser from './../components/OnlineUser.vue'
import ChatRoom from './../components/ChatRoom.vue'
import { mapState } from 'vuex'

export default {
  name: 'PublicChatViews',
  components: {
    OnlineUser,
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
  sockets: {
    connect () {
      console.log('socket connected')
      this.$socket.emit('current user', { ...this.currentUser, socketId: this.$socket.id })
      this.sockets.subscribe('users', (data) => {
        this.users = data
        console.log('data', data)
      })
      this.sockets.subscribe('user connected', (data) => {
        console.log('user connected', data)
      })
    },
    disconnect () {
      console.log('socket disconnected')
    },
    users: function (data) {
      console.log('這包是data', data)
    },
    'user connected': function (data) {
      this.newUser = data
    },
    'chat message': function (data) {
      console.log('這是message', data)
    }
  },
  methods: {
    // 從component傳回來資料，再傳送給後端
    handleAfterSubmit () {
      // $socket is socket.io-client instance
      this.$socket.emit('public message', this.content)
      console.log(this.content)
    }
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
