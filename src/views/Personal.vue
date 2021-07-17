<template>
  <div class="main__container">
    <div class="left__content">
      <SideNavBar />
    </div>
    <div
      class="right__content"
    >
      <router-view />
    </div>
  </div>
</template>
<script>
import SideNavBar from '../components/SideNavbar.vue'

export default {
  name: 'Personal',
  components: {
    SideNavBar
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .main__container {
    display: grid;
    grid-template-columns: 1fr 3fr 30px 15fr ;
    grid-template-areas: " . left . right";
    .left__content{
      grid-area: left;
    }
    .right__content{
      grid-area: right;
      border: 1px solid $light-gray;
      height: 100vh;
    }
  }
</style>
