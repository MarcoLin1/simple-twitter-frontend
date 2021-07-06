<template>
  <div class="side-navbar-container">
    <div class="nav-item-container">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <router-link
        class="side-navbar-main-wrapper"
        to="/mainpage"
      >
        <div class="icon-wrapper icon-main-wrpper" />
        <div class="content">
          首頁
        </div>
      </router-link>
      <router-link
        class="side-navbar-user-wrapper"
        to=""
      >
        <div class="icon-wrapper icon-user-wrpper" />
        <div class="content">
          個人資料
        </div>
      </router-link>
      <router-link
        class="side-navbar-setting-wrapper"
        to="setting"
      >
        <div class="icon-wrapper icon-setting-wrpper" />
        <div class="content">
          設定
        </div>
      </router-link>
      <div class="side-navbar-button-wrapper">
        <button
          type="submit"
          class="side-navbar-button"
        >
          推文
        </button>
      </div>
    </div>
    <div class="bottom-item-container">
      <router-link
        class="side-navbar-logout-wrpper"
        to="/login"
      >
        <div class="icon-wrapper icon-logout-wrapper" />
        <div class="content">
          登出
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from './../assets/icon/logo.vue'

export default {
  components: {
    Logo: Logo
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.side-navbar-container {
  width: 100%;
  max-width: 150px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.nav-item-container {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50px;
  margin: 0 auto;
}
.bottom-item-container {
  display: flex;
  justify-content: center;
}
.side-navbar-main-wrapper, .side-navbar-user-wrapper, .side-navbar-setting-wrapper, .side-navbar-logout-wrpper {
  width: 40px;
  border-radius: 50%;
  text-decoration: none;
  &:hover {
    background: $orange;
  }
}
.icon-wrapper {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.icon-main-wrpper {
  mask-image: url('./../assets/icon/icon_main.svg');
  -webkit-mask-image: url('./../assets/icon/icon_main.svg');
  @extend %icon-style;
  &:hover {
    background: #ffffff;
  }
}
.icon-user-wrpper {
  mask-image: url('./../assets/icon/icon_user.svg');
  -webkit-mask-image: url('./../assets/icon/icon_user.svg');
  @extend %icon-style;
  &:hover {
    background: #ffffff;
  }
}
.icon-setting-wrpper {
  mask-image: url('./../assets/icon/icon_setting.svg');
  -webkit-mask-image: url('./../assets/icon/icon_setting.svg');
  @extend %icon-style;
  &:hover {
    background: #ffffff;
  }
}
.icon-logout-wrapper {
  mask-image: url('./../assets/icon/icon_logout.svg');
  -webkit-mask-image: url('./../assets/icon/icon_logout.svg');
  @extend %icon-style;
  &:hover {
    background: #ffffff;
  }
}
.content {
  display: none;
  cursor: pointer;
  color: $black;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}

.side-navbar-button {
  width: auto;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid $orange;
  color: $orange;
  &:hover {
    background: $orange;
    color: #ffffff;
    border: none;
  }
}

@media screen and (min-width: 768px) {
  .side-navbar-container {
    align-items: none;
    max-width: 330px;
  }
  .nav-item-container {
    width: auto;
  }
  .side-navbar-main-wrapper, .side-navbar-user-wrapper, .side-navbar-setting-wrapper, .side-navbar-logout-wrpper {
    display: flex;
    align-items: center;
    width: auto;
    border-radius: none;
    &:hover {
      background: #ffffff;
    }
  }
  .icon-main-wrpper, .icon-user-wrpper, .icon-setting-wrpper, .icon-logout-wrapper {
    &:hover {
      background: $orange;
    }
  }
  .content {
    display: block;
    width: 100%;
    margin-left: 20px;
    font-weight: 700;
    font-size: 18px;
    &:hover {
      color: $orange;
    }
  }
  .side-navbar-button {
    width: 100%;
    max-width: 210px;
    border-radius: 100px;
    background: $orange;
    color: #ffffff;
  }
}
</style>
