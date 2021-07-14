<template>
  <div>
    <TweetInfo
      :initial-tweet="tweet"
      @after-submit="addTweetAfterSubmit"
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
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id: tweetId } = this.$route.params
    console.log(tweetId)
    this.fetchData(tweetId)
    this.fetchReplies(tweetId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchData(id)
    this.fetchReplies(id)
    next()
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
        console.log(data)
      } catch (error) {
        console.log('error', error)
      }
    },
    addTweetAfterSubmit (data) {
      this.replies.unshift({
        comment: data,
        createdAt: new Date(),
        User: {
          account: this.currentUser.account,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        }
      })
    }
  }
}
</script>
