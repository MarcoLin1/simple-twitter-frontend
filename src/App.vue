<template>
  <div id="app">
    <router-view />
    <TopUsersList />
    <SideNavBar />
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
import SideNavBar from './components/SideNavbar.vue'
export default {
  components: {
    TopUsersList,
    Post,
    SideNavBar

  }
}
</script>
