<template>
  <div id="app">
    <router-view />
    <TopUsersList />
    <div class="m-4">
      <Post />
    </div>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import TopUsersList from './components/TopUsersList.vue'
import Post from './components/Post.vue'

export default {
  components: {
    TopUsersList,
    Post
  }
}
</script>
