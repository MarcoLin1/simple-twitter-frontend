<template>
  <div>
    <LoginForm @after-submit="handelAfterSubmit" />
  </div>
</template>
<script>
import LoginForm from './../components/LoginForm.vue'
import authorizationAPI from './../apis/authorization'
export default {
  components: {
    LoginForm
  },
  created () {
    console.log(this.$route.path)
    console.log('1223')
  },
  methods: {
    async handelAfterSubmit (loginData) {
      try {
        console.log('data')
        const { data } = await authorizationAPI.login(loginData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log(data)
        localStorage.setItem('token', data.token)
        this.$router.push('/mainpage')
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>
