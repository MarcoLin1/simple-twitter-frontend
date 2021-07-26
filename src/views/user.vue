<template>
  <div class="main-container">
    <div class="left-content">
      <SideNavbar @after-side-submit="handleAfterSubmit" />
    </div>
    <div class="right-wrapper">
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
      name: '',
      userTweetsLength: '',
      newTweet: {}
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

.main-container{
  display: flex;
  .left-content {
  display: flex;
  justify-content: flex-end;
  width: 25%;
  }
  .right-wrapper{
    width: 75%;
    display: grid;
    grid-template-columns: 602px 1fr;
    .middle-content{
      border: 1px solid $light-gray;
    }

  }

}
@media screen and (min-width: 992px) and (max-width: 1180px) {
  .main-container{
    .left-content{
      width: 10%;
    }
    .right-wrapper{
      width: 90%;
   }
  }

}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .main-container{
    .left-content{
      width: 20%;
    }
    .right-wrapper{
      width: 80%;
    .right-content{
      display: none;
    }
   }

  }

}

</style>
