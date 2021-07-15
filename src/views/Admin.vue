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
  display: flex;
  width: 100%;
}
.admin__left__wrapper {
  width: 23%;
  display: flex;
  justify-content: center;
}
.admin__right__wrapper {
  width: 77%;
  border-left: 1px solid $light-gray;
}
</style>
