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
      messages: []
    }
  },
  computed: {
    ...mapState(['currentUser', 'privateChatUser'])
  },
  beforeRouteEnter (to, from, next) {
    const id = from.params.id || -1
    // 不能直接用this
    next(vm => { vm.listener.id = id })
  },
  watch: {
    listener (newValue, oldValue) {
      // 如果id有正常變化才會傳給後端離開聊天室的訊息
      if (newValue.id !== -1 && oldValue.id !== -1) {
        this.$socket.emit('leaveRoom', { id: this.currentUser.id, listenerId: oldValue.id })
      }
    }
  },
  created () {
    this.$socket.connect()
    this.listener = this.privateChatUser
  },
  mounted () {
    // 傳給後端兩人的ＩＤ
    this.$socket.emit('enterPrivateInterface', { id: this.currentUser.id, listenerId: this.listener.id })
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
    this.$socket.disconnect()
  },
  destroyed () {
    this.$socket.connect()
  },
  sockets: {
    connect () {
      console.log('socket connected in component')
    },
    disconnect () {
      console.log('socket disconnected')
    },
    users: function (data) {
      this.users = data
      console.log('users data', data)
    },
    chattedUsers: function (data) {
      this.chats = data // 不確定
      console.log('chattedUsers', data)
    },
    privateMessage: function (data) {
      // this.messages.push(data)
      console.log('這是privateMessage:', data)
    }
  },
  methods: {
    // enter room事件傳送給後端
    handelAfterEnter (data) {
      console.log('handelAfterEnter', data)
      // 將資料存在listener中，傳遞給chatroom
      this.listener = data
      this.$socket.emit('enterRoom', { id: this.currentUser.id, listenerId: data.id })
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
