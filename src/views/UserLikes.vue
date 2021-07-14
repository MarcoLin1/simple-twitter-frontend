<template>
  <div class="user__likes__container">
    <div class="user__likes__main__wrapper">
      <UserProfile :get-current-user="currentUser" />
      <UserPostItem :user-id="userId" />
      <UserPost
        v-for="post in userLikes"
        :key="post.TweetId"
        :initial-tweet="post"
        :like-num="post.likeCount"
      />
    </div>
  </div>
</template>

<script>
import UserProfile from './../components/UserProfile.vue'
import UserPost from './../components/UserPost.vue'
import UserPostItem from './../components/UserPostItem.vue'
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'

export default {
  name: 'UserLikes',
  components: {
    UserProfile,
    UserPost,
    UserPostItem
  },
  data () {
    return {
      userLikes: [],
      currentUser: [],
      userId: ''
    }
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchUserLikes(id)
    this.fetchCurrentUser()
  },
  methods: {
    async fetchUserLikes (userId) {
      try {
        const { data } = await userAPI.getUserLikes({ userId })
        this.userLikes = data
        console.log(data)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '喜歡的內容讀取失敗，請稍候再試'
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
  .user__likes__container {
    display: flex;
    justify-content: space-around;
  }
  .user__likes__main__wrapper {
    width: 100%;
    max-width: 600px;
  }
</style>
