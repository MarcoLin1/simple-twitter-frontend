<template>
  <div class="main-container">
    <SideNavbar />
    <div class="setting-form-wrapper">
      <AccountDetailForm />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import AccountDetailForm from './../components/AccountDetailForm.vue'
export default {
  components: {
    SideNavbar: SideNavbar,
    AccountDetailForm: AccountDetailForm
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    height: 100%;
    width: auto;
  }
  .setting-form-wrapper {
    width: 100%;
  }

</style>
