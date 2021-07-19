<template>
  <div class="main_container">
    <div class="middle__content">
      <ChatList
        :initial-chats="chats"
        @after-enter="handelAfterEnter"
      />
    </div>
    <div
      class="right__content"
    >
      <!-- 如果有id的話就在room標題顯示id ， -->
      <PrivateChatRoom
        :initial-listener="listener"
        :initial-messages="messages"
      />
    </div>
  </div>
</template>
<script>
import ChatList from './../components/ChatList.vue'
import PrivateChatRoom from './../components/PrivateChatRoom.vue'
import { mapState } from 'vuex'
import chatAPI from './../apis/chat'
export default {
  name: 'PrivateChatViews',
  components: {
    ChatList,
    PrivateChatRoom
  },
  data () {
    return {
      listener: {},
      chats: [],
      messages: [],
      isPrivate: true
    }
  },
  computed: {
    ...mapState(['currentUser', 'privateChatUser'])
  },
  watch: {
    listener (newValue, oldValue) {
      // 如果id有正常變化才會傳給後端離開聊天室的訊息
      if (newValue.id !== -1 && oldValue.id !== -1) {
        this.$socket.emit('leaveRoom', { id: this.currentUser.id, listenerId: oldValue.id })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const id = from.params.id || -1
    // 不能直接用this
    next(vm => { vm.listener.id = id })
  },
  created () {
    this.$socket.connect()
    this.getPrivateUsersList()
    this.listener = this.privateChatUser
  },
  mounted () {
    // 傳給後端兩人的ＩＤ
    this.$socket.emit('enterPrivateInterface', { id: this.currentUser.id, listenerId: this.listener.id })

    console.log('this.listener.id', this.listener.id)
    // 進房間傳給後端，如果listener id === -1 則不傳送
    if (this.listener.id !== -1) {
      this.$socket.emit('enterRoom', { id: this.currentUser.id, listenerId: this.listener.id })
    }
  },
  beforeRouteUpdate () {
    this.$socket.connect()
  },
  beforeDestroy () {
    console.log('leave')
    // state 清空
    this.privateChatUser.id = -1
    this.privateChatUser.name = ''
    this.privateChatUser.account = ''
    this.$sockets.disconnect()
  },
  destroyed () {
    this.$socket.connect()
  },

  sockets: {
    connect () {
      console.log('socket connected in private chat')
    },
    disconnect () {
      console.log('socket disconnected')
    },
    getMessages: function (data) {
      if (this.messages.length === 0) {
        data.forEach(item => {
          if (item.id === this.chats[0].id) {
            this.messages.push(item)
          }
          if (item.id === this.currentUser.id) {
            this.messages.push(item)
          }
        })
      }
      console.log('這是getMessages in private', data)
    },
    privateMessage: function (data) {
      this.messages.push(data)
      console.log('這是privateMessage:', data)
    }
  },
  methods: {
    // enter room事件傳送給後端
    handelAfterEnter (data) {
      // 避免重複抓取歷史訊息
      this.listener = data
      const length = this.messages.length
      this.messages.splice(0, length)
      // 將資料存在listener中，傳遞給chatroom
      this.$socket.emit('enterRoom', { id: this.currentUser.id, listenerId: data.id })
    },
    async getPrivateUsersList () {
      const { data } = await chatAPI.getPrivateUsers(this.currentUser.id)
      console.log('getPrivateUsers data', data)
      this.chats = data
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
