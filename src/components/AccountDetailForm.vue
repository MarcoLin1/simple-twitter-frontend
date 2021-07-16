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
            v-model="currentUser.account"
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
            v-model="currentUser.name"
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
            v-model="currentUser.email"
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
            v-model="currentUser.password"
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
            v-model="currentUser.checkPassword"
            type="password"
            class="account__detail__check__password account__detail__form__control"
          >
        </div>
        <div
          v-if="$route.path.slice(0, 8) === '/setting'"
          class="account__detail__save__button__wrapper"
        >
          <button
            type="submit"
            class="account__detail__save__button"
            :disabled="isProcessing"
          >
            {{ isProcessing ? '處理中':'儲存' }}
          </button>
        </div>
        <div
          v-else
          class="account__detail__register__button__wrapper"
        >
          <button
            type="submit"
            class="account__detail__register__button"
            :disabled="isProcessing"
          >
            {{ isProcessing ? '處理中':'註冊' }}
          </button>
          <router-link
            to="/login"
            class="account__detail__register__text"
          >
            取消
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'

export default {
  props: {
    isProcessing: {
      type: Boolean
    }
  },
  data () {
    return {
      newUser: {
        id: -1,
        name: '',
        account: '',
        password: '',
        checkPassword: ''
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async handleSubmit () {
      try {
        // this.isProcessing = true
        if (!this.newUser.name || !this.newUser.account || !this.newUser.password || !this.newUser.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請確認所有欄位皆已填寫'
          })
          return
        }
        if (this.newUser.password !== this.newUser.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '兩次密碼輸入不相符，請重新輸入'
          })
          this.newUser.password = ''
          this.newUser.checkPassword = ''
          return
        }
        this.$emit('after-submit', this.currentUser)
        this.$emit('after-register', this.newUser)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '資料修改失敗，請稍候再試'
        })
      }
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
  background-color: $orange;
  color: #ffffff;
  border-radius: 50px;
  border: none;
  :disabled{
    background-color: $disabled-orange
  }
}
.account__detail__register__button__wrapper {
  width: 100%;
  max-width: 642px;
  height: 40px;
  text-align: center;
  .account__detail__register__button {
    width: 100%;
    height: 100%;
    background-color: $orange;
    color: #ffffff;
    border-radius: 50px;
    border: none;
    margin-bottom: 20px;
  }
}

</style>
