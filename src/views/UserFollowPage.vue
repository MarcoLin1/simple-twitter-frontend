<template>
  <div class="main__container">
    <div class="left__container">
      <SideNavbar @after-side-submit="handleAfterSubmit" />
    </div>
    <div
      class="middle__container"
    >
      <Spinner v-if="isLoading" />
      <template v-else>
        <TopNavbar
          :current-page="$route.path.slice(0, 9) === '/mainpage'? '首頁': '推文'"
          :initial-name="name"
          :initial-user-tweets-length="userTweetsLength"
        />
        <UserFollowItem />
        <router-view />
      </template>
    </div>
    <div class="right__container">
      <TopUsersList :top-users="topUsers" />
    </div>
  </div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'
import TopUsersList from '../components/TopUsersList.vue'
import TopNavbar from '../components/TopNavbar.vue'
import UserFollowItem from './../components/UserFollowItem.vue'
import userAPI from '../apis/users'
import { Toast } from '../utils/helper'
import { mapState } from 'vuex'
import Spinner from '../components/Spinner.vue'
export default {
  name: 'UserFollowPage',
  components: {
    SideNavbar,
    TopUsersList,
    TopNavbar,
    Spinner,
    UserFollowItem
  },
  data () {
    return {
      topUsers: [],
      name: '',
      userTweetsLength: '',
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserData(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchTopUser()
    this.fetchUserData(id)
  },
  methods: {
    async fetchTopUser () {
      try {
        const { data } = await userAPI.getTopUsers()
        this.topUsers = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: 'TopUser讀取失敗'
        })
      }
    },
    async fetchUserData (userId) {
      try {
        this.isLoading = true
        const { data } = await userAPI.getUserTweets({ userId })
        this.name = data[0].User.name
        this.userTweetsLength = data.length
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
      }
    },
    handleAfterSubmit (data) {
      this.newTweet = data
      this.$emit('after-side-submit', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.main__container{
  display: grid;
  grid-template-columns: 1fr 2fr 30px 600px 30px 2fr 1fr;
  grid-template-areas: " . left . middle . right .";
}
.left__container {
  grid-area: left;
}
.middle__container{
  grid-area: middle;
  width: 602px;
  border: 1px solid $light-gray;
  position: relative;
}
.right__container {
  grid-area: right;
}
</style>
