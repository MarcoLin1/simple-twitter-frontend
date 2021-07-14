<template>
  <div class="user__replies__container">
    <div class="user__replies__main__wrapper">
      <UserProfile :get-current-user="currentUser" />
      <UserPostItem :user-id="userId" />
      <UserPost
        v-for="post in userReplies"
        :key="post.TweetId"
        :initial-tweet="post"
        :like-num="post.likeCount"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import UserProfile from './../components/UserProfile.vue'
import UserPostItem from './../components/UserPostItem.vue'
import UserPost from './../components/UserPost.vue'
export default {
  name: 'UserReplies',
  components: {
    UserProfile,
    UserPostItem,
    UserPost
  },
  data () {
    return {
      userReplies: [],
      currentUser: [],
      userId: ''
    }
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchUserReplies(id)
    this.fetchCurrentUser()
  },
  methods: {
    async fetchUserReplies (userId) {
      try {
        const { data } = await userAPI.getUserReplies({ userId })
        this.userReplies = data
        console.log(this.userReplies)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '有回覆訊息的資料讀取失敗，請稍候再試'
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
  .user__replies__container {
    display: flex;
    justify-content: space-around;
  }
  .user__replies__main__wrapper {
    width: 100%;
    max-width: 600px;
  }
</style>
