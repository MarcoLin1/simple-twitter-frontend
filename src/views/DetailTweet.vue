<template>
  <div>
    <TweetInfo
      :initial-tweet="tweet"
    />
    <Messages
      v-for="reply in replies"
      :key="reply.id"
      :initial-user="user"
      :initial-reply="reply"
    />
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
      tweet: {},
      replies: [],
      user: {
        id: '',
        account: ''
      }
    }
  },
  created () {
    const { id: tweetId } = this.$route.params
    console.log(tweetId)
    this.fetchData(tweetId)
    this.fetchReplies(tweetId)
  },
  methods: {
    async fetchData (tweetId) {
      try {
        const { data } = await tweetAPI.getATweet({ tweetId })
        console.log('data', data)
        this.tweet = data
        this.user.id = data.User.id
        this.user.account = data.User.account
      } catch (error) {
        console.log('error', error)
      }
    },
    async fetchReplies (tweetId) {
      try {
        const { data } = await tweetAPI.getReplies({ tweetId })
        this.replies = data
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>
