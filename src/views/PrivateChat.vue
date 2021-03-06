<template>
  <div class="main_container">
    <div
      v-show="!isEnterRoom || !isSmallSize"
      class="middle__content"
    >
      <ChatList
        :initial-chats="chats"
        @after-enter="handelAfterEnter"
      />
    </div>
    <div
      v-show="!isSmallSize || isEnterRoom"
      class="right__content"
    >
      <!-- 如果有id的話就在room標題顯示id ， -->
      <PrivateChatRoom
        :initial-listener="listener"
        :initial-messages="messages"
        :is-small-size="isSmallSize"
        :enter-room="isEnterRoom"
        @after-submit="handleAfterSubmit"
        @previous-page="goPreviousPage"
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
      isPrivate: true,
      isSmallSize: false,
      isEnterRoom: false
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
    window.addEventListener('resize', this.resizeEvent)
  },
  mounted () {
    if (window.innerWidth < 992) {
      this.isSmallSize = true
      if (this.privateChatUser.id !== -1) {
        this.isEnterRoom = true
      }
    }
    // 傳給後端兩人的ＩＤ
    this.$socket.emit('enterPrivateInterface', { id: this.currentUser.id, listenerId: this.listener.id })

    // 進房間傳給後端，如果listener id === -1 則不傳送
    if (this.listener.id !== -1) {
      this.$socket.emit('enterRoom', { id: this.currentUser.id, listenerId: this.listener.id })
    }
    this.getPrivateUsersList()
  },
  beforeRouteUpdate () {
    this.$socket.connect()
  },
  beforeDestroy () {
    console.log('leave')
    window.removeEventListener('resize', this.resizeEvent)
    // state 清空
    this.privateChatUser.id = -1
    this.privateChatUser.name = ''
    this.privateChatUser.account = ''
    this.$socket.emit('leaveRoom', { id: this.currentUser.id, listenerId: this.listener.id })
    console.log('leave room event', { id: this.currentUser.id, listenerId: this.listener.id })
  },
  sockets: {
    connect () {
      console.log('socket connected in private chat')
    },
    disconnect () {
      console.log('socket disconnected')
    },
    privateMessage: function (data) {
      this.messages.push(data)
    },
    messageNotify: function (data) {
      console.log('component messageNotifydata', data)
      this.getPrivateUsersList()
    }
  },
  methods: {
    resizeEvent (e) {
      const newWidth = window.innerWidth
      if (newWidth <= 992) {
        this.isSmallSize = true
      } else {
        this.isSmallSize = false
      }
    },
    goPreviousPage (data) {
      this.isEnterRoom = data
    },
    // enter room事件傳送給後端
    handelAfterEnter (data) {
      console.log('handelAfterEnter', data)
      // 避免重複抓取歷史訊息
      this.listener = data
      const length = this.messages.length
      this.messages.splice(0, length)
      // 將資料存在listener中，傳遞給chatroom
      this.$socket.emit('enterRoom', { id: this.currentUser.id, listenerId: data.id })
      this.historyMessage(data.id)
      // 如果是螢幕縮小才要更改屬性
      if (this.isSmallSize) {
        this.isEnterRoom = true
      }
    },
    handleAfterSubmit () {
      this.getPrivateUsersList()
    },
    async getPrivateUsersList () {
      const { data } = await chatAPI.getPrivateUsers(this.currentUser.id)
      this.chats = data
      console.log(data)
    },
    // 和私訊對象的歷史訊息
    async historyMessage (listener) {
      try {
        const { data } = await chatAPI.messages({ isPrivate: true, id: this.currentUser.id, listenerId: listener })
        if (this.messages.length === 0) {
          data.forEach(item => {
            item = JSON.parse(JSON.stringify(item))
            this.messages.push(item)
          })
        }
      } catch (e) {
        console.log(e)
      }
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

@media screen and (max-width: 992px) {
  .main__container{
    border-left: none;
    .middle__content{
      width: 600px;
      border-right: 1px solid $light-gray;
    }
    .right__content{
      border-right: 1px solid $light-gray;
      width: 600px;
    }
  }

}
</style>
