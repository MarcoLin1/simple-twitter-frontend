<template>
  <div>
    <div class="top-wrapper">
      <TopNavbar :current-page="'首頁'" />
    </div>
    <TweetForm />
    <Post />
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import Post from './../components/Post.vue'
import TopNavbar from './../components/TopNavbar.vue'

export default {
  components: {
    TopNavbar,
    TweetForm,
    Post

  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.top-wrapper{
  width: 100%;
  border-left: 1px solid $light-gray;
  border-right: 1px solid $light-gray;
}
</style>
