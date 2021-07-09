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
}
.admin__left__wrapper {
  flex: 0 1 23%;
}
.admin__right__wrapper {
  width: 100%;
  flex: 0 1 75%;
  border-left: 1px solid $light-gray;
}
</style>
