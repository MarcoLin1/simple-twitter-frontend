<template>
  <div class="user__tweet__container">
    <div class="user__tweet__main__wrapper">
      <template>
        <UserPost
          v-for="post in posts"
          :key="post.TweetId"
          :initial-tweet="post"
          :like-num="post.likeCount"
        />
      </template>
    </div>
  </div>
</template>

<script>
import UserPost from './../components/UserPost.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'
export default {
  name: 'UserTweets',
  components: {
    UserPost
  },
  data () {
    return {
      posts: [],
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
    this.fetchTweets(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchTweets(id)
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
