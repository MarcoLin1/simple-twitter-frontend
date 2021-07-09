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
  display: flex;
  justify-content: start;
  .left-content{
    flex:0 1 25%;
    display: flex;
    justify-content: center;
  }
  .middle-content{
    display: flex;
    width: 100%;
    flex:0 1 40%;
  }
  .right-content{
    flex:0 1 35%;
  }
}

</style>
