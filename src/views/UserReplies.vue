<template>
  <div class="user__replies__container">
    <div class="user__replies__side__navbar__wrapper">
      <SideNavbar />
    </div>
    <div class="user__replies__main__wrapper">
      <TopNavbar />
      <UserProfile />
      <UserPost />
    </div>
    <div class="user__replies__top__users__list__wrapper">
      <TopUsersList />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import TopNavbar from './../components/TopNavbar.vue'
import TopUsersList from './../components/TopUsersList.vue'
import UserProfile from './../components/UserProfile.vue'
import UserPost from './../components/UserPost.vue'
export default {
  components: {
    SideNavbar,
    TopNavbar,
    TopUsersList,
    UserProfile,
    UserPost
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__replies__container {
    display: flex;
    justify-content: space-around;
  }
  .user__replies__main__wrapper {
    width: 100%;
    max-width: 600px;
    border: solid 1px $light-gray;
  }
</style>
