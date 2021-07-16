<template>
  <div class="m-5">
    <OnlineUser>
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
          @click="clickButton"
        >
          test
        </button>
      </form>
    </onlineuser>
  </div>
</template>
<script>
import OnlineUser from './../components/OnlineUser.vue'
export default {
  components: {
    OnlineUser
  },
  data () {
    return {
      content: ''
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }

  },
  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', data)
      console.log(data)
    }
  }
}
</script>
