<template>
  <div class="main__container">
    <div class="left__content">
      <SideNavBar />
    </div>
    <div class="middle__content">
      <OnlineUser :all-users="allUsers" />
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
import SideNavBar from './../components/SideNavbar.vue'
import { mapState } from 'vuex'

export default {
  name: 'PublicChatViews',
  components: {
    OnlineUser,
    ChatRoom,
    SideNavBar
  },
  data () {
    return {
      // 還沒用到
      isConnected: false,
      allUsers: [],
      message: [],
      newUser: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    connect () {
      console.log('socket connected')
      this.$socket.emit('current user', { ...this.currentUser, socketId: this.$socket.id })
      // this.sockets.subscribe('user connected', (data) => {
      //   console.log('這是connected', data)
      // })
      this.sockets.subscribe('users', (data) => {
        this.allUsers = data
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
  .main__container {
    display: grid;
    grid-template-columns: 1fr 4fr 30px 4fr  11fr ;
    grid-template-areas: " . left . middle right";
    .left__content{
      grid-area: left;
    }
    .right__content{
      grid-area: right;
    }
    .middle__content{
      grid-area: middle
    }
  }
</style>
