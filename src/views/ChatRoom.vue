<template>
  <div class="m-5">
    <h1>123</h1>
    <form action="">
      <textarea
        v-model="content"
        rows="8"
        cols="40"
        type="text"
      />
      <button
        type="submit"
        @click.stop.prevent="clickButton"
      >
        test
      </button>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Chatroom',
  data () {
    return {
      content: '',
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
    clickButton () {
      // $socket is socket.io-client instance
      this.$socket.emit('public message', this.content)
      console.log(this.content)
    }
  }
}
</script>
