<template>
  <div class="user__likes__container">
    <div class="user__likes__main__wrapper">
      <template>
        <UserPost
          v-for="post in userLikes"
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
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import { mapState } from 'vuex'

export default {
  name: 'UserLikes',
  components: {
    UserPost
  },
  data () {
    return {
      userLikes: [],
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
