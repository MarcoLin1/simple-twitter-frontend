<template>
  <div class="user__followers__container">
    <TopNavbar
      :current-page="currentPage"
    />
    <div class="user__followers__main__wrapper">
      <UserFollowerList :initial-followers="followers" />
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
import UserFollowerList from './../components/UserFollowerList.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
// const dummyData = {
//   users:
//     {
//       id: 1,
//       name: 'root',
//       email: 'root@example.com',
//       password: '$2a$10$K2x6pQHkzPEKzw86x8Tc0.bfW7QVdA2Ls4AXBFkFu7xHG3UgA4Mli',
//       isAdmin: true,
//       image: 'https://i.pravatar.cc/300',
//       createdAt: '2021-07-05T09:58:39.000Z',
//       updatedAt: '2021-07-05T10:31:19.000Z',
//       Followers: [],
//       FollowerCount: 0,
//       TweetCount: 15,
//       isFollowed: false
//     },
//   isAuthenticated: true
// }
export default {
  name: 'UserFollowers',
  components: {
    TopNavbar,
    UserFollowerList
  },
  data () {
    return {
      followers: {
        id: -1,
        name: '',
        account: '',
        avatar: '',
        introduction: '',
        isFollowing: false
      },
      currentPage: 'UserFollowers'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchFollowers(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchFollowers(id)
  },
  methods: {
    async fetchFollowers (userId) {
      try {
        const { data } = await userAPI.getUserFollowers({ userId })
        this.followers = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__followers__main__wrapper {
    width: 600px;
    margin-top: 26px;
  }
</style>
