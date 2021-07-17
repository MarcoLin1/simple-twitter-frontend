<template>
  <div class="main__container">
    <div class="left__content">
      <SideNavBar />
    </div>
    <div class="middle__content">
      <OnlineUser />
    </div>
    <div
      class="right__content"
      @after-submit="handleAfterSubmit"
    >
      <ChatRoom />
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
      isConnected: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  sockets: {
    connect () {
      console.log('socket connected')
      this.$socket.emit('users', { ...this.currentUser, socketId: this.$socket.id })
      console.log(this.$socket.id)
      console.log({ ...this.currentUser, socketsId: this.$socket.id })
    },
    disconnect () {
      console.log('socket disconnected')
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
