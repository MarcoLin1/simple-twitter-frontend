<template>
  <div class="main__container">
    <div class="left__container">
      <SideNavbar @after-side-submit="handleAfterSubmit" />
    </div>
    <div class="right__container">
      <div class="middle___wrapper">
        <Spinner v-if="isLoading" />
        <template v-else>
          <TopNavbar
            :current-page="$route.path.slice(0, 9) === '/mainpage'? '首頁': '推文'"
            :initial-name="name"
            :initial-user-tweets-length="userTweetsLength"
            class="top"
          />
          <UserProfile
            :get-current-user="currentUser"
            :initial-user="initialUser"
            :initial-following="initialFollowing"
            :user-id="userId"
            @update-following="changeFollowingStatus"
          />
          <UserPostItem :user-id="userId" />
          <router-view :new-tweet="newTweet" />
        </template>
      </div>
      <div class="right__wrapper">
        <TopUsersList
          :top-users="topUsers"
          @update-data="updateFollowing"
          @update-remove-data="updateFollowing"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'
import TopUsersList from '../components/TopUsersList.vue'
import TopNavbar from '../components/TopNavbar.vue'
import UserPostItem from '../components/UserPostItem.vue'
import UserProfile from '../components/UserProfile.vue'
import userAPI from '../apis/users'
import { Toast } from '../utils/helper'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'
export default {
  components: {
    SideNavbar,
    TopUsersList,
    TopNavbar,
    UserPostItem,
    UserProfile,
    Spinner
  },
  data () {
    return {
      topUsers: [],
      name: '',
      userTweetsLength: '',
      newTweet: {},
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
    console.log('這是to', to)
    this.userId = to.params.id
    this.fetchUserData(id)
    this.fetchUser(id)
    this.fetUserFollowers(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchTopUser()
    this.fetchUserData(id)
    this.fetchUser(id)
    this.fetUserFollowers(id)
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
        this.userTweetsLength = data.length
        this.posts = data
        this.newTweet = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
      }
    },
    // 取得目前路由的使用者資料
    async fetchUser (userId) {
      try {
        this.isLoading = true
        const { data } = await userAPI.getUser({ userId })
        this.initialUser = data
        this.name = data.name
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
        this.isLoading = true
        const { data } = await userAPI.getUserFollowers({ userId })
        this.initialFollowers = data
        this.initialFollowers.forEach(item => {
          if (item.followerId !== this.currentUser.id) {
            this.initialFollowing = false
          } else {
            this.initialFollowing = true
          }
        })
        this.isLoading = false
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '讀取不到跟隨者的資料'
        })
      }
    },
    handleAfterSubmit (data) {
      this.newTweet = data
      this.$emit('after-side-submit', data)
    },
    // 改變profile的following狀態
    updateFollowing (userId) {
      if (userId !== this.initialUser.id) {
        return
      }
      if (userId === this.initialUser.id) {
        this.initialFollowing = !this.initialFollowing
      }
    },
    // 改變topUserList的following狀態
    changeFollowingStatus (userId) {
      this.topUsers.forEach(user => {
        if (user.id === userId) {
          user.isFollowing = !user.isFollowing
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.main__container{
  display: flex;
  .left__container {
    width: 25%;
    display: flex;
    justify-content: flex-end;
  }
  .right__container{
    width: 75%;
    display: grid;
    grid-template-columns: 602px 1fr;
    .middle___wrapper{
      border: 1px solid $light-gray;
    }
  }
}

@media screen and (min-width: 992px) and (max-width: 1180px) {
  .main__container{
    .left__container{
      width: 10%;
    }
    .right__container{
      width: 90%;
   }
  }

}

@media screen and(min-width: 769px) and (max-width: 992px) {
  .main__container{
    .left__container{
      width: 20%;
    }
    .right__container{
      display: flex;
      width: 80%;
      .right__wrapper{
        display: none;
      }
   }
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .main__container {
    .left__container {
      min-width: 85px;
      width: 20%;
    }
    .right__container{
      display: flex;
      width: 80%;
      .middle___wrapper{
        width: 100%;
        flex-grow: 1;
      }
      .right__wrapper{
        display: none;
      }
   }
  }
}
@media  screen and (max-width: 480px) {
  .main__container {
    .left__container {
      width: 0%;
    }
    .right__container{
      width: 100%;
      margin-bottom: 25px;
      .middle___wrapper{
        width: 100%;
        flex-grow: 1;
      }
      .right__wrapper{
        display: none;
      }
    }
  }

}

</style>
