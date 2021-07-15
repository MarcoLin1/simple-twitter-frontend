<template>
  <div class="main-container">
    <Logo />
    <h1>建立你的帳號</h1>
    <div class="form-wrapper">
      <AccountDetailForm @after-register="handleAfterSubmit" />
    </div>
  </div>
</template>
<script>
import AccountDetailForm from './../components/AccountDetailForm.vue'
import Logo from './../assets/icon/logo.vue'
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helper'
export default {
  components: {
    AccountDetailForm,
    Logo
  },
  data () {
    return {
      try: ''
    }
  },
  methods: {
    async handleAfterSubmit (formData) {
      try {
        const { data } = await authorizationAPI.register({
          name: formData.name,
          account: formData.account,
          email: formData.email,
          password: formData.password,
          checkPassword: formData.checkPassword
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        } else {
          Toast.fire({
            icon: 'success',
            title: '註冊成功'
          })
        }
        this.$router.push({ name: 'login' })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '註冊失敗，請確認註冊的帳號密碼'
        })
      }
    }
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
