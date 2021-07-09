<template>
  <div>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from './../components/LoginForm.vue'

export default {
  components: {
    LoginForm

  },
  created () {
    console.log(this.$route.path)
    console.log('1223')
  }
}
</script>
