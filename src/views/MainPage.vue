<template>
  <div>
    <TweetForm />
    <Post />
  </div>
</template>
<script>
import TweetForm from './../components/TweetForm.vue'
import Post from './../components/Post.vue'

export default {
  components: {
    TweetForm,
    Post
  }
}
</script>
