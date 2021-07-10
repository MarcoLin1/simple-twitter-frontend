<template>
  <div class="user__likes__container">
    <!-- <div class="user__likes__side__navbar__wrapper">
      <SideNavbar />
    </div> -->
    <div class="user__likes__main__wrapper">
      <!-- <TopNavbar /> -->
      <UserProfile />
      <UserPost />
    </div>
  </div>
</template>

<script>

import UserProfile from './../components/UserProfile.vue'
import UserPost from './../components/UserPost.vue'
export default {
  components: {

    UserProfile,
    UserPost
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__likes__container {
    display: flex;
    justify-content: space-around;
  }
  .user__likes__main__wrapper {
    width: 100%;
    max-width: 600px;

  }
</style>
