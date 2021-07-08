<template>
  <div id="app">
    <router-view />
    <div class="m-4">
      <Top />
      <Messages />
    </div>
    <SideNavBar />
    <Post />
  </div>
</template>

<script>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Messages from './components/Messages.vue'
import SideNavBar from './components/SideNavbar.vue'
import Post from './components/Post.vue'
import Top from './components/TopUsersList.vue'

export default {
  components: {
    Messages,
    Post,
    Top,
    SideNavBar

  }
}
</script>
