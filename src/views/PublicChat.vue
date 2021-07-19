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
import chatAPI from './../apis/chat'
export default {
  name: 'PublicChatViews',
  components: {
    OnlineUser,
    ChatRoom
  },
  data () {
    return {
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
    this.$socket.emit('currentUser', { ...this.currentUser })
  },
  beforeDestroy () {
    console.log('leave')
    this.$socket.disconnect()
  },
  destroyed () {
    console.log('請重新連接')
    this.$socket.connect()
  },
  mounted () {
    this.historyMessage()
  },
  methods: {
    async historyMessage () {
      try {
        const { data } = await chatAPI.messages({ isPrivate: false, id: this.currentUser.id, listenerId: 0 })
        data.forEach(item => {
          this.messages.push(item)
        })
        console.log('這是history', data)
      } catch (e) {
        console.log(e)
      }
    }
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
      console.log('這是public chat的user connected', data)
    },
    userDisconnected: function (data) {
      this.messages.push(data)
      console.log('這是disconnect的人', data)
    },
    chatMessage: function (data) {
      console.log('這是message', data)
      this.messages.push(data)
      console.log(this.messages)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .main_container {
      display: flex;
    .right__content{
      width: 65%;
    }
    .middle__content{
      width: 35%;
    }
  }
</style>
