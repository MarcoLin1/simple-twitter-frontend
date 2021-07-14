<template>
  <div>
    <TweetForm @after-submit="handleAfterSubmit" />

    <template v-if="tweets.length">
      <UserPost
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
      />
    </template>
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import UserPost from './../components/UserPost.vue'
import tweetAPI from './../apis/tweets'
import { Toast } from '../utils/helper'

export default {
  name: 'Mainpage',
  components: {
    TweetForm,
    UserPost
  },
  data () {
    return {
      tweets: [],
      isProcessing: false,
      currentUser: {
        id: '2',
        name: 'user2',
        account: 'user2',
        avator: 'https://loremflickr.com/320/240/people?random=0'
      }
    }
  },
  created () {
    this.isProcessing = true
    this.fetchTweets()
    this.isProcessing = false
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await tweetAPI.getTweets()
        this.tweets = data
        console.log(this.tweets)
        this.isProcessing = false
      } catch (errer) {
        this.isProcessing = false
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
        this.tweets.push({
          createdAt: new Date(),
          description: description,
          User: {
            // account: this.currentUser.account,
            name: this.currentUser.name,
            id: this.currentUser.id
            // avator: this.currentUser.avator
          }
        })
        console.log(data)
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
