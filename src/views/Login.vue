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
      if (data.user.isAdmin) {
        Toast.fire({
          icon: 'warning',
          title: '查無此使用者資料，請於後台登入，謝謝！'
        })
      } else {
        localStorage.setItem('token', data.token)

        // 透過setCurrentUser 把使用者資料存到Vuex的state中
        this.$store.commit('setCurrentUser', data.user)

        this.$router.push('/mainpage')
      }
    }
  }
}
</script>
