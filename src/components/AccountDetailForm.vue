<template>
  <div class="account__detail__form__container">
    <!-- <TopNavbar /> -->
    <form
      action="POST"
      class="account__detail__form__wrapper"
    >
      <div class="account__detail__form__table">
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            帳號
          </span>
          <input
            id="account"
            type="text"
            class="account__detail__account account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            名稱
          </span>
          <input
            id="name"
            type="text"
            class="account__detail__name account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            Email
          </span>
          <input
            id="email"
            type="email"
            class="account__detail__email account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            密碼
          </span>
          <input
            id="password"
            type="password"
            class="account__detail__password account__detail__form__control"
          >
        </div>
        <div class="account__detail__form__group">
          <span class="account__detail__form__group__title">
            密碼確認
          </span>
          <input
            id="check__password"
            type="password"
            class="account__detail__check__password account__detail__form__control"
          >
        </div>
        <div class="account__detail__save__button__wrapper">
          <button
            type="submit"
            class="account__detail__save__button"
          >
            儲存
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import TopNavbar from './TopNavbar.vue'
export default {
  components: {
    // TopNavbar: TopNavbar
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.account__detail__form__container {
  height: 100vh;
  border-left: 1px solid $light-gray;
}
.account__detail__form__wrapper {
  border-top: 1px solid $light-gray;
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
