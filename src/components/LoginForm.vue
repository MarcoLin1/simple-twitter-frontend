<template>
  <form
    action="POST"
    @submit.stop.prevent="handleSubmit"
  >
    <div class="logo-wrapper">
      <Logo />
    </div>
    <div class="login__title mt-4 mb-4">
      {{ $route.path.slice(0, 6) === '/admin' ? '後台登入':'登入Alphitter' }}
    </div>

    <div class="login__form__table">
      <div class="login__form__group">
        <span class="login__form__group__title">
          帳號
        </span>
        <input
          id="account"
          v-model="account"
          type="text"
          class="login__account"
          required
        >
      </div>
      <div class="login__form__group">
        <span class="login__form__group__title">
          密碼
        </span>
        <input
          id="password"
          v-model="password"
          type="password"
          class="login__password login__form__control"
          required
        >
      </div>
      <div class="login__button">
        <button
          type="submit"
          class="login__button"
        >
          登入
        </button>
      </div>
      <div class="login__group">
        <router-link
          to="/register"
          class="login__register"
        >
          註冊 Alphitter
        </router-link>·
        <router-link
          to="/admin/login"
          class="login__admin"
        >
          後台登入
        </router-link>
      </div>
    </div>
  </form>
</template>
<script>
import Logo from './../assets/icon/logo.vue'
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helper'
export default {
  components: {
    Logo
  },
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        const userData = await authorizationAPI.login({
          account: this.account,
          password: this.password
        })
        const { data } = userData
        console.log('userData:', userData)
        localStorage.setItem('token', data.token)

        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/mainpage')
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '登入失敗'
        })
      }
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.logo-wrapper{
  width: 100%;
  margin: 65px 0 48px 0 ;
  display: flex;
  justify-content: center;
}
.login__title {
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
}
.login__form__group {
  @extend %form-group-style;
}
.login__form__group__title {
  @extend %form-group-title-style;
}
.login__account, .login__password {
  @extend %form-input-style;
  &:focus {
    outline: none;
    box-shadow: 3px 3px 10px 0px #657786;
  }
}
.login__button {
  @extend %form-button-style;
}
.login__group {
  width: 100%;
  max-width: 540px;
  margin: 20px auto 0 auto;
  text-align: right;
}
</style>
