<template>
  <div class="main-container">
    <div class="left-content">
      <SideNavbar />
    </div>
    <div class="middle-content">
      <router-view />
    </div>
    <div class="right-content">
      <TopUsersList :top-users="topUsers" />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import TopUsersList from './../components/TopUsersList.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  components: {
    SideNavbar,
    TopUsersList
  },
  data () {
    return {
      topUsers: []
    }
  },
  created () {
    this.fetchTopUser()
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.main-container{
  display: grid;
  grid-template-columns: 100px 1fr 50px 2fr 50px 1fr 100px;
  grid-template-areas: " . left . middle . right .";
}
.left-content {
  grid-area: left;
}
.middle-content{
  grid-area: middle;
  height: auto;
  width: 600px;
  border: solid 1px $light-gray;
}
.right-content {
  grid-area: right;
}

</style>
