<template>
  <div class="user__likes__container">
    <div class="user__likes__main__wrapper">
      <Spinner v-if="isLoading" />
      <template v-else>
        <template>
          <div
            v-if="!userLikes"
            class="empty-message"
          >
            目前沒有喜歡的推文內容哦，快去按讚吧！
          </div>
          <template v-else>
            <UserPost
              v-for="post in userLikes"
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
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'

export default {
  name: 'UserLikes',
  components: {
    UserPost,
    Spinner
  },
  data () {
    return {
      userLikes: [],
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
    this.fetchUserLikes(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchUserLikes(id)
  },
  methods: {
    async fetchUserLikes (userId) {
      try {
        this.isLoading = true
        const { data } = await userAPI.getUserLikes({ userId })
        this.userLikes = data
        this.isLoading = false
        console.log(data)
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '喜歡的內容讀取失敗，請稍候再試'
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
