<template>
  <div class="main__container">
    <SideNavbar />
    <div class="setting__form__wrapper">
      <div class="setting__top__navbar__wrapper">
        <TopNavbar :current-page="currentPage" />
      </div>
      <AccountDetailForm />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import TopNavbar from './../components/TopNavbar.vue'
import AccountDetailForm from './../components/AccountDetailForm.vue'
export default {
  components: {
    SideNavbar: SideNavbar,
    TopNavbar: TopNavbar,
    AccountDetailForm: AccountDetailForm
  },
  data () {
    return {
      currentPage: '帳戶設定'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .main__container {
    display: flex;
    height: 100%;
    width: auto;
  }
  .setting__form__wrapper {
    width: 100%;
    border-left: 1px solid $light-gray;
  }
  .setting__top__navbar__wrapper {
    border-bottom: 1px solid $light-gray;
  }
</style>
