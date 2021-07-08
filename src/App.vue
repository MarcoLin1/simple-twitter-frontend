<template>
  <div id="app">
    <router-view />
    <div class="m-4">
      <AdminUserCard />
    </div>
  </div>
</template>

<script>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminUserCard from './components/AdminUserCard.vue'
// import Messages from './components/Messages.vue'
// import SideNavBar from './components/SideNavbar.vue'
// import Post from './components/Post.vue'
// import Top from './components/TopUsersList.vue'

export default {
  components: {
    AdminUserCard

  }
}
</script>
