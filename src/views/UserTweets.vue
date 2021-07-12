<template>
  <div class="user__tweet__container">
    <div class="user__tweet__main__wrapper">
      <UserProfile :get-current-user="currentUser" />
      <UserPostItem />
      <UserPost
        v-for="post in posts"
        :key="post.TweetId"
        :initial-tweet="post"
        :like-num="post.likeCount"
      />
    </div>
  </div>
</template>

<script>
import UserProfile from './../components/UserProfile.vue'
import UserPostItem from './../components/UserPostItem.vue'
import UserPost from './../components/UserPost.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  name: 'UserTweets',
  components: {
    UserProfile,
    UserPostItem,
    UserPost
  },
  data () {
    return {
      posts: [],
      currentUser: []
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchTweets(id)
    this.fetchCurrentUser()
  },
  methods: {
    async fetchTweets (userId) {
      try {
        const { data } = await userAPI.getUserTweets({ userId })
        this.posts = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '推文資料讀取失敗，請稍後再試'
        })
      }
    },
    async fetchCurrentUser () {
      try {
        const { data } = await userAPI.getCurrentUser()
        this.currentUser = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '讀取現在使用者資料失敗'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__tweet__container {
    display: flex;
    justify-content: space-around;
  }
  .user__tweet__main__wrapper {
    width: 100%;
    max-width: 600px;
  }
</style>
