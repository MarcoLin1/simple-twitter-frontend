<template>
  <div class="account__detail__form__container">
    <form
      class="account__detail__form__wrapper"
      @submit.stop.prevent="handleSubmit"
    >
      <div class="account__detail__form__table">
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            帳號
          </span>
          <input
            v-if="$route.path.slice(0, 7) === '/signup'"
            id="account"
            v-model="newUser.account"
            required
            type="text"
            class="account__detail__account account__detail__form__control"
          >
          <input
            v-else
            id="account"
            v-model="user.account"
            type="text"
            class="account__detail__account account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            名稱
          </span>
          <input
            v-if="$route.path.slice(0, 7) === '/signup'"
            id="name"
            v-model="newUser.name"
            required
            type="text"
            class="account__detail__name account__detail__form__control"
          >
          <input
            v-else
            id="name"
            v-model="user.name"
            type="text"
            class="account__detail__name account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            Email
          </span>
          <input
            v-if="$route.path.slice(0, 7) === '/signup'"
            id="email"
            v-model="newUser.email"
            required
            type="email"
            class="account__detail__email account__detail__form__control"
          >
          <input
            v-else
            id="email"
            v-model="user.email"
            type="email"
            class="account__detail__email account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            密碼
          </span>
          <input
            v-if="$route.path.slice(0, 7) === '/signup'"
            id="password"
            v-model="newUser.password"
            required
            type="password"
            class="account__detail__password account__detail__form__control"
          >
          <input
            v-else
            id="password"
            v-model="user.password"
            type="password"
            class="account__detail__password account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            密碼確認
          </span>
          <input
            v-if="$route.path.slice(0, 7) === '/signup'"
            id="check__password"
            v-model="newUser.checkPassword"
            required
            type="password"
            class="account__detail__check__password account__detail__form__control"
          >
          <input
            v-else
            id="check__password"
            v-model="user.checkPassword"
            type="password"
            class="account__detail__check__password account__detail__form__control"
          >
        </div>
        <div class="account__detail__save__button__wrapper">
          <button
            type="submit"
            class="account__detail__save__button"
            :disabled="isProcessing"
          >
            {{ isProcessing ? '處理中':'儲存' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from './../utils/helper'
import userAPI from './../apis/users'

export default {
  data () {
    return {
      user: {
        id: -1,
        name: '',
        account: '',
        password: '',
        checkPassword: ''
      },
      newUser: {
        id: -1,
        name: '',
        account: '',
        password: '',
        checkPassword: ''
      },
      isProcessing: false
    }
  },
  created () {
    this.fetchCurrentUser()
  },
  methods: {
    async fetchCurrentUser () {
      try {
        const { data } = await userAPI.getCurrentUser()
        this.user = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '讀取currentUser失敗'
        })
      }
    },
    handleSubmit (e) {
      if (!this.user.account || !this.user.name || !this.user.email || !this.user.password || !this.user.checkPassword) {
        Toast.fire({
          icon: 'error',
          title: '資料請確實填寫'
        })
        return
      }
      this.isProcessing = true

      // 將form資料轉成formData傳父層
      // const form = e.target
      // const formData = new FormData(form)
      this.$emit('after-submit', this.user)
      this.$emit('after-register', this.newUser)
      this.isProcessing = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.account__detail__form__container {
  height: 100vh;

}
.account__detail__form__table {
  padding: 2rem 2rem 0 1rem;
  padding-top: 2rem;
  position: relative;
  max-width: 642px;
  padding-right: 2rem;
}
.account__detail__form__group {
  width: auto;
  margin-bottom: 1.5rem;
  max-width: 642px;
  position: relative;
}
.account__detail__form__group__title {
  position: absolute;
  left: 10px;
  top: 5px;
  z-index: 1;
  font-size: 15px;
  color: $tx-gray;
}
.account__detail__form__control {
  @extend %form-input-style;
  padding-bottom: 10px;
  &:focus {
    outline: none;
    box-shadow: 3px 3px 10px 0px $tx-gray;
  }
}
.account__detail__save__button__wrapper {
  position: absolute;
  right: 0;
  margin-top: 1rem;
  padding-right: 2rem;
}
.account__detail__save__button {
  width: 120px;
  height: 50px;
  background: $orange;
  color: #ffffff;
  border-radius: 50px;
  border: none;
}
</style>
