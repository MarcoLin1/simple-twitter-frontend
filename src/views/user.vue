<template>
  <div class="main-container">
    <div class="left-content">
      <SideNavbar />
    </div>
    <div class="middle-content">
      <router-view />
    </div>
    <div class="right-content">
      <TopUsersList />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import TopUsersList from './../components/TopUsersList.vue'
export default {
  components: {
    SideNavbar,
    TopUsersList
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.main-container{
  display: grid;
  grid-template-columns: 100px 1fr 50px 2fr 50px 1fr 100px;
  grid-template-areas: " . left . middle . right .";
}
.left__content {
  grid-area: left;
}
.middle-content{
  grid-area: middle;
  border: 1px solid $light-gray;
  height: auto;
  width: 600px;
}
.right-content {
  grid-area: right;
}

</style>
