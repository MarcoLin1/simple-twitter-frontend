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
import { mapState } from 'vuex'

export default {
  name: 'Mainpage',
  components: {
    TweetForm,
    UserPost
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
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    newTweet (newValue) {
      this.tweets.unshift({
        TweetId: newValue.id,
        createdAt: new Date(),
        description: newValue.tweet,
        isLike: 0,
        likeCount: 0,
        replyCount: 0,
        User: {
          account: this.currentUser.account,
          name: this.currentUser.name,
          id: this.currentUser.id,
          avatar: this.currentUser.avatar
        }
      })
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

        this.tweets.unshift({
          TweetId: data.id,
          createdAt: new Date(),
          description: description,
          isLike: 0,
          likeCount: 0,
          replyCount: 0,
          User: {
            account: this.currentUser.account,
            name: this.currentUser.name,
            id: this.currentUser.id,
            avatar: this.currentUser.avatar
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
