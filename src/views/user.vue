<template>
  <div class="main-container">
    <div class="left-content">
      <SideNavbar @after-side-submit="handleAfterSubmit" />
    </div>
    <div class="middle-content">
      <TopNavbar
        :current-page="$route.path.slice(0, 9) === '/mainpage'? '首頁': '推文'"
        :initial-name="name"
        :initial-user-tweets-length="userTweetsLength"
      />
      <router-view :new-tweet="newTweet" />
    </div>
    <div class="right-content">
      <TopUsersList :top-users="topUsers" />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import TopUsersList from './../components/TopUsersList.vue'
import TopNavbar from './../components/TopNavbar.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  components: {
    SideNavbar,
    TopUsersList,
    TopNavbar
  },
  data () {
    return {
      topUsers: [],
<<<<<<< HEAD
      name: '',
      userTweetsLength: ''
=======
      newTweet: {}
>>>>>>> develop
    }
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
        this.isLoading = true
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
        const { data } = await userAPI.getUserTweets({ userId })
        this.name = data[0].User.name
        this.userTweetsLength = data.length
      } catch (e) {
        console.log(e)
      }
    handleAfterSubmit (data) {
      this.newTweet = data
      this.$emit('after-side-submit', data)
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.main-container{
  display: grid;
  grid-template-columns: 1fr 2fr 30px 600px 30px 2fr 1fr;
  grid-template-areas: " . left . middle . right .";
}
.left-content {
  grid-area: left;
}
.middle-content{
  grid-area: middle;
  width: 602px;
  border: 1px solid $light-gray;
  position: relative;
}
.right-content {
  grid-area: right;
}

</style>
