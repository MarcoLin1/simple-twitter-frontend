<template>
  <div>
    <Spinner
      v-if="isLoading"
      class="mt-5"
    />
    <template v-else>
      <TweetForm @after-submit="handleAfterSubmit" />
      <template v-if="tweets.length">
        <UserPost
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
        />
      </template>
    </template>
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import UserPost from './../components/UserPost.vue'
import tweetAPI from './../apis/tweets'
import Spinner from './../components/Spinner.vue'
import { Toast } from '../utils/helper'
import { mapState } from 'vuex'

export default {
  name: 'Mainpage',
  components: {
    TweetForm,
    UserPost,
    Spinner
  },
  props: {
    newTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweets: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    newTweet (newValue) {
      this.fetchTweets()
    }

  },

  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await tweetAPI.getTweets()
        this.tweets = data
        this.isLoading = false
      } catch (error) {
        console.log('errer', error)
        Toast.fire({
          icon: 'error',
          title: '無法顯示Tweets，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (description) {
      try {
        const { data } = await tweetAPI.create({ description })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 傳送sockets發文事件
        this.$socket.emit('subscribeNotify', { id: this.currentUser.id, content: description, avatar: this.currentUser.avatar, name: this.currentUser.name, labelName: 'tweet' })
        this.fetchTweets()
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法新增 Tweet，請稍後再試'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.top-wrapper{
  width: 100%;
}
</style>
