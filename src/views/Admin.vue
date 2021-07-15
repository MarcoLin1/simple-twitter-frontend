<template>
  <div class="admin__container">
    <div class="admin__left__wrapper">
      <SideNavbar />
    </div>
    <div class="admin__right__wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'

export default {
  components: {
    SideNavbar
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.admin__container {
  display: grid;
  grid-template-columns: 1fr 2fr 30px 600px 30px 2fr 1fr;
  grid-template-areas: " . left . right right right right";
}
.admin__left__wrapper {
  grid-area: left;
  display: flex;
  justify-content: center;
}
.admin__right__wrapper {
  grid-area: right;
  border-left: 1px solid $light-gray;
}
</style>
