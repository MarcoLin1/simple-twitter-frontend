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
    const { id } = from.params
    // 不能直接用this
    next(vm => { vm.listenerId = id })
  },
  watch: {
    listener (newValue, oldValue) {
      console.log('這是new', newValue)
      console.log('這是old', oldValue)
      // 傳送資料給後端
      if (newValue !== -1 || oldValue !== -1) {
        console.log('還沒換人')
      }
    }
  },
  created () {
    this.$socket.connect()
    this.listener = this.privateChatUser
  },
  mounted () {
    // 傳給後端兩人的ＩＤ
    this.sockets.subscribe('users', (data) => {
      console.log('users', data)
    })
    this.$socket.emit('enterPrivateInterface', { id: this.currentUser.id, listenerId: this.listenerId })
    console.log('enterPrivateInterface', { id: this.currentUser.id, listenerId: this.listenerId })
  },
  beforeDestroy () {
    console.log('leave')
    this.$socket.disconnect()
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
      console.log('chattedUser 有成功嗎？')
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
      console.log('handelAfterEnter', data)

      // 避免重複抓取歷史訊息
      this.listener = data
      const length = this.messages.length
      this.messages.splice(0, length)

      // 將資料存在listener中，傳遞給chatroom
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
