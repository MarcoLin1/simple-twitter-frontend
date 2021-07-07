<template>
  <div id="app">
    <router-view />
    <div class="m-4">
      <UserProfile />
    </div>

    <TopUsersList />
    <SideNavBar />
  </div>
</template>

<script>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import TopUsersList from './components/TopUsersList.vue'
import UserProfile from './components/UserProfile.vue'
import SideNavBar from './components/SideNavbar.vue'
export default {
  components: {
    TopUsersList,
    UserProfile,
    SideNavBar

  }
}
</script>
