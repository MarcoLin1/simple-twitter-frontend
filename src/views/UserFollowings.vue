<template>
  <div class="user__followings__container">
    <!-- <TopNavbar
      :current-page="currentPage"
    /> -->
    <div class="user__followings__main__wrapper">
      <UserFollowingList :initial-followings="followings" />
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
// import TopNavbar from './../components/TopNavbar.vue'
import UserFollowingList from './../components/UserFollowingList.vue'

export default {
  name: 'UserFollowings',
  components: {
    // TopNavbar,
    UserFollowingList
  },
  data () {
    return {
      followings: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: '',
        tweetLength: '',
        isFollowed: false
      },
      currentPage: 'UserFollowings',
      topUsers: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await userAPI.getUserFollowing({ userId })
        this.followings = data
        console.log('this followings:', this.followings)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
      // this.user = {
      //   ...this.user,
      //   ...dummyUser.users
      // }
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__followings__main__wrapper {
    width: 600px;
  }
</style>
