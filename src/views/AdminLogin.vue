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
  methods: {
    handelAfterSubmit (data) {
      if (!data.user.isAdmin) {
        Toast.fire({
          icon: 'warning',
          title: '查無此管理者資料'
        })
      } else {
        localStorage.setItem('token', data.token)
        this.$router.push('/admin/tweets')
      }
    }
  }
}
</script>
