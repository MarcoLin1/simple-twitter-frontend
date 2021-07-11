<template>
  <div>
    <div class="top-wrapper">
      <TopNavbar :current-page="'首頁'" />
    </div>
    <TweetForm @after-submit="handleAfterSubmit" />
    <UserPost
      v-for="tweet in tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
    />
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import UserPost from './../components/UserPost.vue'
import TopNavbar from './../components/TopNavbar.vue'
import tweetAPI from './../apis/tweets'
import { Toast } from '../utils/helper'

export default {
  components: {
    TopNavbar,
    TweetForm,
    UserPost
  },
  data () {
    return {
      tweets: [],
      currentUser: {
        id: '2',
        name: 'user2',
        account: 'user2',
        avator: 'https://loremflickr.com/320/240/people?random=0'
      }
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
        console.log(this.tweets)
      } catch (errer) {
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
          User: {
            account: this.currentUser.account,
            name: this.currentUser.name,
            id: this.currentUser.id,
            avator: this.currentUser.avator
          },
          createdAt: new Date(),
          description: description

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
