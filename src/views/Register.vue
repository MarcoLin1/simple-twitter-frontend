<template>
  <div class="main-container">
    <Logo />
    <h1>建立你的帳號</h1>
    <div class="form-wrapper">
      <AccountDetailForm
        :is-processing="isProcessing"
        @after-register="handleAfterSubmit"
      />
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
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await authorizationAPI.register({
          name: formData.name,
          account: formData.account,
          email: formData.email,
          password: formData.password,
          checkPassword: formData.checkPassword
        })
        if (data.status !== 'success') {
          this.isProcessing = false
          throw new Error(data.message)
        } else {
          Toast.fire({
            icon: 'success',
            title: '註冊成功'
          })
        }
        this.isProcessing = false
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        if (error.response.data.message.includes('帳號重複')) {
          Toast.fire({
            icon: 'error',
            title: '此帳號已有人註冊，請重新輸入'
          })
          this.isProcessing = false
        } else if (error.response.data.message.includes('信箱重複')) {
          Toast.fire({
            icon: 'error',
            title: '此信箱已被註冊，請重新輸入'
          })
          this.isProcessing = false
        } else {
          Toast.fire({
            icon: 'error',
            title: '註冊失敗，請確認註冊的帳號密碼'
          })
        }
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
