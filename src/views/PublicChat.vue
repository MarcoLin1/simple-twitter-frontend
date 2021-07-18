<template>
  <div class="main_container">
    <div class="middle__content">
      <OnlineUser :initial-users="users" />
    </div>
    <div
      class="right__content"
    >
      <ChatRoom
        :messages="messages"
      />
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
      users: [],
      messages: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate () {
    this.$socket.connect()
  },
  created () {
    // connect () {
    this.$socket.connect()
    this.$socket.emit('currentUser', { ...this.currentUser })
    // this.sockets.subscribe('users', (data) => {
    //   console.log('這是sockets的user connected', data)
    // })
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    disconnect () {
      console.log('socket disconnected!!!!!!!!!!!')
    },
    users: function (data) {
      console.log('這包是user data', data)
      this.users = data
    },
    userConnected: function (data) {
      this.messages.push(data)
      console.log('這是外面的user connected', data)
    },
    userDisconnected: function (data) {
      this.messages.push(data)
      console.log('這是disconnect的人', data)
    },
    chatMessage: function (data) {
      console.log('這是message', data)
      this.messages.push(data)
      console.log(this.messages)
    },
    getMessages: function (data) {
      // data.forEach(item => {

      // })
      if (this.messages.length > 100) {
        this.messages = []
        data.forEach(item => {
          this.messages.push(item)
        })
      } else {
        data.forEach(item => {
          this.messages.push(item)
        })
        console.log('這是get message', data)
      }
    }
  },
  beforeDestroy () {
    console.log('leave')
    // this.$socket.disconnect()
  },
  destroyed () {
    console.log('請重新連接')
    this.$socket.connect()
  },
  destroyed () {
    this.$socket.connect()
  },
  methods: {
    // // 從component傳回來資料，再傳送給後端
    // handleAfterSubmit () {
    //   // this.sockets.subscribe('chatMessage', data => {
    //   //   this.messages.push(data)
    //   // })
    // }
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
