<template>
  <div>
    <TweetInfo />
    <Messages />
  </div>
</template>
<script>
import TweetInfo from './../components/TweetInfo.vue'
import Messages from './../components/Messages.vue'
export default {
  components: {
    TweetInfo,
    Messages
  }
}
</script>
