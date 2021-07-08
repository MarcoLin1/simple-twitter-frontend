<template>
  <div class="main-container">
    <div class="left__content">
      <SideNavbar />
    </div>
    <div class="middle-content">
      <TopNavbar />
      <router-view />
    </div>
    <div class="right-content">
      <TopUsersList />
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
import SideNavbar from './../components/SideNavbar.vue'
import TopUsersList from './../components/TopUsersList.vue'
export default {
  components: {
    SideNavbar,
    TopUsersList,
    TopNavbar
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.main-container{
  display: grid;
  grid-template-columns: 380px 600px 467px;
}

</style>
