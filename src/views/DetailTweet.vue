<template>
  <div>
    <Spinner
      v-if="isLoading"
      class="mt-5"
    />
    <template v-else>
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
    </template>
  </div>
</template>
<script>
import TweetInfo from './../components/TweetInfo.vue'
import Messages from './../components/Messages.vue'
import tweetAPI from './../apis/tweets'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'
import { Toast } from '../utils/helper'

export default {
  components: {
    TweetInfo,
    Messages,
    Spinner
  },
  data () {
    return {
      tweet: {},
      replies: [],
      user: {
        id: '',
        account: ''
      },
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id: tweetId } = this.$route.params
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
        this.isLoading = true
        const { data } = await tweetAPI.getATweet({ tweetId })
        this.tweet = data
        this.user.id = data.User.id
        this.user.account = data.User.account
        this.isLoading = false
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法讀取該則推文，請稍後再試'
        })
      }
    },
    async fetchReplies (tweetId) {
      try {
        this.isLoading = true
        const { data } = await tweetAPI.getReplies({ tweetId })
        this.replies = data
        this.isLoading = false
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
