<template>
  <div class="user__followers__container">
    <div class="user__followers__main__wrapper">
      <UserFollowerList :initial-followers="followers" />
    </div>
  </div>
</template>

<script>
import UserFollowerList from './../components/UserFollowerList.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'

export default {
  name: 'UserFollowers',
  components: {
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
