<template>
  <div class="user__replies__container">
    <div
      class="user__replies__main__wrapper"
    >
      <template>
        <UserPost
          v-for="post in userReplies"
          :key="post.TweetId"
          :initial-tweet="post"
          :like-num="post.likeCount"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
import { mapState } from 'vuex'
import userAPI from './../apis/users'
import UserPost from './../components/UserPost.vue'

export default {
  name: 'UserReplies',
  components: {
    UserPost
  },
  data () {
    return {
      userReplies: [],
      userId: '',
      initialUser: [],
      initialFollowers: [],
      initialFollowing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserReplies(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchUserReplies(id)
  },
  methods: {
    async fetchUserReplies (userId) {
      try {
        const { data } = await userAPI.getUserReplies({ userId })
        this.userReplies = data
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
