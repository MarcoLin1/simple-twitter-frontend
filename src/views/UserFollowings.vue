<template>
  <div class="user__followings__container">
    <TopNavbar
      :current-page="currentPage"
    />
    <div class="user__followings__main__wrapper">
      <UserFollowingList :initial-followings="followings" />
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import TopNavbar from './../components/TopNavbar.vue'
import UserFollowingList from './../components/UserFollowingList.vue'

export default {
  name: 'UserFollowings',
  components: {
    TopNavbar,
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
      currentPage: 'UserFollowings'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  created () {
    this.fetchUser()
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await userAPI.getUserFollowing({ userId })
        this.followings = data
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
    // fetchTweets () {
    //   const { tweets } = dummyData
    //   this.userFollowingsTweets = tweets
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__followings__main__wrapper {
    width: 600px;
    margin-top: 26px;
  }
</style>
