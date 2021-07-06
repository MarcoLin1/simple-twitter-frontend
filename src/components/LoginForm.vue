<template>
  <form action="POST">
    <div class="login__title mt-5 mb-4">
      登入Alphitter
    </div>
    <div class="login__form__table">
      <div class="login__form__group">
        <span class="login__form__group__title">
          帳號
        </span>
        <input
          id="account"
          type="text"
          class="login__account"
        >
      </div>
      <div class="login__form__group">
        <span class="login__form__group__title">
          密碼
        </span>
        <input
          id="password"
          type="password"
          class="login__password login__form__control"
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

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
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
