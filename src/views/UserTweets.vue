<template>
  <div class="user__tweet__container">
    <div class="user__tweet__main__wrapper">
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
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__tweet__container {
    display: flex;
    justify-content: space-around;
  }
  .user__tweet__main__wrapper {
    width: 100%;
    max-width: 600px;
  }
</style>
