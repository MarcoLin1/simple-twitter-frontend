<template>
  <div>
    <LoginForm @after-submit="handelAfterSubmit" />
  </div>
</template>
<script>
import LoginForm from './../components/LoginForm.vue'
import { Toast } from '../utils/helper'
export default {
  components: {
    LoginForm
  },
  created () {
    console.log(this.$route.path)
  },
  methods: {
    handelAfterSubmit (data) {
      console.log(data)
      if (data.user.isAdmin) {
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
      } else {
        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/mainpage')
      }
    }
  }
}
</script>
