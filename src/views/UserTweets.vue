<template>
  <div class="user__tweet__container">
    <div class="user__tweet__main__wrapper">
      <Spinner v-if="isLoading" />
      <template v-else>
        <UserProfile
          :get-current-user="currentUser"
          :initial-user="initialUser"
          :initial-following="initialFollowing"
          :user-id="userId"
        />
        <UserPostItem :user-id="userId" />
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
import UserProfile from './../components/UserProfile.vue'
import UserPostItem from './../components/UserPostItem.vue'
import UserPost from './../components/UserPost.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'
export default {
  name: 'UserTweets',
  components: {
    UserProfile,
    UserPostItem,
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
    this.fetchTweets(id)
    this.fetchUser(id)
    this.fetUserFollowers(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchTweets(id)
    this.fetchUser(id)
    this.fetUserFollowers(id)
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
    // 取得目前路由的使用者資料
    async fetchUser (userId) {
      try {
        this.isLoading = true
        const { data } = await userAPI.getUser({ userId })
        this.initialUser = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: 'user頁面資料讀取失敗'
        })
      }
    },
    // 取得目前路由的使用者的followers清單，和currentUser比對，如果currentUser在清單中就是following狀態
    async fetUserFollowers (userId) {
      try {
        const { data } = await userAPI.getUserFollowers({ userId })
        this.initialFollowers = data
        this.initialFollowers.forEach(item => {
          if (item.followerId !== this.currentUser.id) {
            this.initialFollowing = false
          } else {
            this.initialFollowing = true
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '讀取不到跟隨者的資料'
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
