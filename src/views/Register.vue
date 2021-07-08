<template>
  <div class="main-container">
    <Logo />
    <h1>建立你的帳號</h1>
    <div class="form-wrapper">
      <AccountDetailForm />
    </div>
  </div>
</template>
<script>
import AccountDetailForm from './../components/AccountDetailForm.vue'
import Logo from './../assets/icon/logo.vue'
export default {
  components: {
    AccountDetailForm,
    Logo
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.main-container{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 65px;
}
.form-wrapper{
  width: 642px;
  }
h1{
  margin: 35px auto 20px auto;
  @include text-style(23px, 700, $black)
}
</style>
