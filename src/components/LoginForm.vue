<template>
  <form
    action="POST"
    @submit.prevent.stop="handleSubmit"
  >
    <div class="logo-wrapper">
      <Logo />
    </div>
    <div class="login__title mt-4 mb-4">
      {{ $route.path.slice(0, 6) === '/admin' ? '後台登入':'登入Alphitter' }}
    </div>

    <div class="login__form__table">
      <div class="login__form__group">
        <label
          for="account"
          class="login__form__group__title"
        >
          帳號
        </label>
        <input
          id="account"
          v-model="account"
          v-focus
          name="account"
          type="text"
          class="login__account"
          required
        >
      </div>
      <div class="login__form__group login__form__group__password">
        <label
          for="password"
          class="login__form__group__title"
        >
          密碼
        </label>
        <input
          id="password"
          v-model="password"
          name="password"
          :type="showType"
          class="login__password login__form__control"
          required
        >
        <div
          :class="{'password__icon--show':showType === 'text','password__icon--notshow':showType === 'password'}"
          @click.stop.prevent="showPassword"
        />
      </div>
      <div class="login__button">
        <button
          type="submit"
          class="login__button"
          :disabled="isProcessing"
        >
          {{ isProcessing?'處理中':'登入' }}
        </button>
      </div>
      <div class="login__group">
        <router-link
          to="/signup"
          class="login__register"
        >
          註冊 Alphitter
        </router-link>·
        <router-link
          v-if="$route.path.slice(0, 6) === '/admin'"
          to="/login"
          class="login__admin"
        >
          前台登入
        </router-link>
        <router-link
          v-else
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
import { Toast } from '../utils/helper'
import Logo from './../assets/icon/logo.vue'
import authorizationAPI from './../apis/authorization'

export default {
  components: {
    Logo
  },
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false,
      showType: 'password'
    }
  },
  methods: {
    showPassword () {
      if (this.showType === 'password') {
        this.showType = 'text'
      } else {
        this.showType = 'password'
      }
    },
    async handleSubmit () {
      try {
        this.isProcessing = true
        if (!this.account.trim() || !this.password.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          this.isProcessing = false
          return
        }
        const { data } = await authorizationAPI.login({ account: this.account, password: this.password })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$emit('after-submit', data)
        this.isProcessing = false
      } catch (error) {
        console.log('error', error)
        this.isProcessing = false
        this.password = ''
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
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
  input{
    padding-bottom: 10px;
  }
  &__password{
    position: relative;
    .password__icon--show, .password__icon--notshow{
      position: absolute;
      top: 50%;
      right: 10px;
      width: 25px;
      height: 25px;
      transform: translateY(-50%);
      cursor: pointer;
      background: $orange;
      @extend %icon-style;
    }
    .password__icon--show{
      mask-image: url('./../assets/icon/icon_eye_visibility.svg');
      -webkit-mask-image: url('./../assets/icon/icon_eye_visibility.svg');
    }
    .password__icon--notshow{
      mask-image: url('./../assets/icon/icon_eye_invisible.svg');
      -webkit-mask-image: url('./../assets/icon/icon_eye_invisible.svg');
    }
  }
}
.login__form__table{
  width: 90%;
  max-width: 540px;
  margin: 0 auto;
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
  :disabled{
    background-color: $disabled-orange;
  }
}
.login__group {
  width: 100%;
  max-width: 540px;
  margin: 20px auto 0 auto;
  text-align: right;
}

</style>
