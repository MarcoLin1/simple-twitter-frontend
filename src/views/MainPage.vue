<template>
  <div>
    <div class="top-wrapper">
      <TopNavbar :current-page="'首頁'" />
    </div>
    <TweetForm />
    <UserPost :initial-tweets="tweets" />
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import UserPost from './../components/UserPost.vue'
import TopNavbar from './../components/TopNavbar.vue'
import TweetsAPI from './../apis/tweets'
import { Toast } from '../utils/helper'

export default {
  components: {
    TopNavbar,
    TweetForm,
    UserPost
  },
  data () {
    return {
      tweets: []
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await TweetsAPI.getTweets()
        this.tweets = data
        console.log(this.tweets)
      } catch (errer) {
        Toast.fire({
          icon: 'error',
          title: '無法顯示Tweets，請稍後再試'

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
