<template>
  <div class="user__replies__container">
    <div
      class="user__replies__main__wrapper"
    >
      <Spinner v-if="isLoading" />
      <template v-else>
        <template>
          <div
            v-if="!userReplies"
            class="empty-message"
          >
            目前沒有回覆，快去看看其他人的推文吧！
          </div>
          <template v-else>
            <UserPost
              v-for="post in userReplies"
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
import { Toast } from '../utils/helper'
import { mapState } from 'vuex'
import userAPI from './../apis/users'
import UserPost from './../components/UserPost.vue'
import Spinner from './../components/Spinner.vue'

export default {
  name: 'UserReplies',
  components: {
    UserPost,
    Spinner
  },
  data () {
    return {
      userReplies: [],
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
        this.isLoading = true
        const { data } = await userAPI.getUserReplies({ userId })
        this.userReplies = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
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
