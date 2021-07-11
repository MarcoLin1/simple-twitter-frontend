<template>
  <div class="user__replies__container">
    <div class="user__replies__main__wrapper">
      <UserProfile />
      <UserPostButton />
      <UserRepliesPost
        v-for="reply in userReplies"
        :key="reply.tweet.id"
        :initial-user-reply="reply"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import UserProfile from './../components/UserProfile.vue'
import UserPostButton from './../components/UserPostButton.vue'
import UserRepliesPost from './../components/UserRepliesPost.vue'
export default {
  components: {
    UserProfile,
    UserPostButton,
    UserRepliesPost
  },
  data () {
    return {
      userReplies: []
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUserReplies(id)
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
