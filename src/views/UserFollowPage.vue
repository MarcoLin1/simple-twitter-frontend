<template>
  <div class="main__container">
    <div class="left__container">
      <SideNavbar @after-side-submit="handleAfterSubmit" />
    </div>
    <div class="right__container">
      <div class="middle__wrapper">
        <Spinner v-if="isLoading" />
        <template v-else>
          <TopNavbar
            :current-page="$route.path.slice(0, 9) === '/mainpage'? '首頁': '推文'"
            :initial-name="name"
            :initial-user-tweets-length="userTweetsLength"
          />
          <UserFollowItem class="follow-wrapper" />
          <router-view
            :initial-followings="followings"
            :initial-followers="followers"
            @update-follow-data="followStatus"
            @update-follower-data="addFollowStatus"
          />
        </template>
      </div>
      <div class="right__wrapper">
        <TopUsersList
          :top-users="topUsers"
          @update-data="handleNewData"
          @update-remove-data="handleRemoveData"
        />
      </div>
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
      isLoading: true,
      followings: {
        Followings: {
          name: '',
          account: '',
          avatar: '',
          id: -1,
          isFollowing: false,
          introduction: ''
        }
      },
      followers: {
        Followers: {
          name: '',
          account: '',
          avatar: '',
          id: -1,
          isFollowing: false,
          introduction: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserData(id)
    this.fetchUser(id)
    this.fetchFollowingUser(id)
    this.fetchFollowerUser(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchTopUser()
    this.fetchUserData(id)
    this.fetchUser(id)
    this.fetchFollowingUser(id)
    this.fetchFollowerUser(id)
  },
  methods: {
    async handleNewData () {
      try {
        const { data } = await userAPI.getUserFollowing({ userId: this.currentUser.id })
        this.followings = data
      } catch (e) {
        console.log(e)
      }
    },
    handleRemoveData (userId) {
      this.followings = this.followings.filter(item => {
        return item.followingId !== userId
      })
      this.followers = this.followers.filter(item => {
        if (item.followerId === userId) {
          item.Followers.isFollowing = false
        }
      })
    },
    removeFollowerStatus (userId) {
      this.topUsers.filter(user => {
        if (user.id === userId) {
          user.isFollowing = false
        }
      })
      console.log('這是follow status', userId)
    },
    addFollowStatus (userId) {
      this.fetchTopUser()
    },
    removeFollowingStatus (userId) {
      this.fetchTopUser()
    },
    async fetchFollowingUser (userId) {
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
    },
    async fetchFollowerUser (userId) {
      try {
        const { data } = await userAPI.getUserFollowers({ userId })
        this.followers = data
      } catch (e) {
        console.log(e)
      }
    },
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
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
      }
    },
    async fetchUser (userId) {
      try {
        this.isLoading = true
        const { data } = await userAPI.getUser({ userId })
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
  display: flex;
  min-height: 100vh;
}
.left__container {
  width: 25%;
  display: flex;
  justify-content: flex-end;
}
.right__container{
  width: 75%;
  display: grid;
  grid-template-columns: 602px 1fr;
  .middle__wrapper{
    border: 1px solid $light-gray;
    .follow-wrapper{
      margin-top: 25px;
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

@media screen and (min-width: 769px) and (max-width: 992px) {
  .main__container{
    .left__container{
      width: 20%;
    }
    .right__container{
      width: 80%;
      .right__wrapper{
        display: none;
      }
   }

  }
}
@media screen and (min-width: 481px) and (max-width: 768px){
   .main__container{
    .left__container{
      min-width: 85px;
      width: 20%;
    }
    .right__container{
      display: flex;
      width: 80%;
      .middle__wrapper{
        width: 100%;
        flex-grow: 1;
      }
      .right__wrapper{
        display: none;
      }
   }
  }
}
@media screen and(max-width:480px) {
   .main__container{
    .left__container{
      width: 0%;
    }
    .right__container{
      display: flex;
      width: 100%;
      margin-bottom: 25px;
      .middle__wrapper{
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
