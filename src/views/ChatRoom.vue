<template>
  <div>
    <h1>123</h1>
    <button
      type="button"
      @click="clickButton('ooooo')"
    >
      test
    </button>
  </div>
</template>
<script>
export default {
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
