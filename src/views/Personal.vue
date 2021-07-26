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
    display: flex;
    .left__content{
      width: 25%;
      display: flex;
      justify-content: flex-end;
    }
    .right__content{
      flex-grow: 1;
      width: 75%;
      border: 1px solid $light-gray;
      height: 100vh;
    }
  }

@media screen and (min-width: 768px) and (max-width: 1180px) {
  .main__container{
    .left__content{
      width: 10%;
    }
    .right__content{
      width: 90%;
    }

  }

}
</style>
