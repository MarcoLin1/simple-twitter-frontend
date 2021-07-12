<template>
  <div>
    <TweetInfo
      :initial-tweet="tweet"
    />
    <Messages />
  </div>
</template>
<script>
import TweetInfo from './../components/TweetInfo.vue'
import Messages from './../components/Messages.vue'
import tweetAPI from './../apis/tweets'

export default {
  components: {
    TweetInfo,
    Messages
  },
  data () {
    return {
      tweet: {}
    }
  },
  created () {
    const { id: tweetId } = this.$route.params
    console.log(tweetId)
    this.fetchData(tweetId)
  },
  methods: {
    async fetchData (tweetId) {
      try {
        const { data } = await tweetAPI.getATweet({ tweetId })
        console.log(data)
        this.tweet = data
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>
