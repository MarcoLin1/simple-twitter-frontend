<template>
  <div class="user__tweet__container">
    <div class="user__tweet__main__wrapper">
      <Spinner v-if="isLoading" />
      <template v-else>
        <template>
          <div
            v-if="!posts"
            class="empty-message"
          >
            目前沒有推文，快去新增推文吧！
          </div>
          <template v-else>
            <UserPost
              v-for="post in posts"
              :key="post.TweetId"
              :initial-tweet="post"
              :like-num="post.likeCount"
            />
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import UserPost from './../components/UserPost.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'
export default {
  name: 'UserTweets',
  components: {
    UserPost,
    Spinner
  },
  data () {
    return {
      posts: [],
      userId: '',
      initialUser: [],
      initialFollowers: [],
      initialFollowing: false,
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    console.log('to', to)
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
        this.isLoading = true
        const { data } = await userAPI.getUserTweets({ userId })
        this.posts = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
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
