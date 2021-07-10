<template>
  <div>
    <div class="top-wrapper">
      <TopNavbar :current-page="'首頁'" />
    </div>
    <TweetForm />
    <UserPost />
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import UserPost from './../components/UserPost.vue'
import TopNavbar from './../components/TopNavbar.vue'

export default {
  components: {
    TopNavbar,
    TweetForm,
    UserPost

  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.top-wrapper{
  width: 100%;
}
</style>
