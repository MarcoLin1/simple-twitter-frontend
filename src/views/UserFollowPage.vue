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
        <UserFollowItem class="follow-wrapper" />
        <router-view
          :initial-followings="followings"
          @update-follow-data="followStatus"
        />
      </template>
    </div>
    <div class="right__container">
      <TopUsersList
        :top-users="topUsers"
        @update-data="handleNewData"
        @update-remove-data="handleRemoveData"
      />
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
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchTopUser()
    this.fetchUserData(id)
    this.fetchUser(id)
    this.fetchFollowingUser(id)
  },
  methods: {
    async handleNewData (userId) {
      try {
        const { data } = await userAPI.getUser({ userId })
        this.followings.push({
          Followings: {
            id: data.id,
            account: data.account,
            name: data.name,
            avatar: data.avatar,
            introduction: data.introduction,
            isFollowing: true
          },
          followingId: userId
        })
      } catch (e) {
        console.log(e)
      }
    },
    handleRemoveData (userId) {
      this.followings = this.followings.filter(item => {
        return item.followingId !== userId
      })
    },
    followStatus (userId) {
      this.topUsers = this.topUsers.filter(user => {
        if (user.id === userId) {
          user.isFollowing = false
        }
      })
      console.log('這是follow status', userId)
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
        // this.initialUser = data
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
  width: 27%;
  display: flex;
  justify-content: flex-end;
}
.middle__container{
  grid-area: middle;
  width: 602px;
  border: 1px solid $light-gray;
  .follow-wrapper{
    margin-top: 25px;
  }
}
.right__container {
  width: 33%;
}
</style>
