<template>
  <div id="app">
    <router-view />
    <Post />
  </div>
</template>

<script>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Post from './components/Post.vue'
export default {
  components: {
    Post
  }
}
</script>
