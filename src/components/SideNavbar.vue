<template>
  <div class="side-navbar-container">
    <div class="nav-item-container">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <router-link
        class="side-navbar-main-wrapper"
        :to="$route.path.slice(0, 6) === '/admin' ?'/admin/tweets':'/mainpage'"
      >
        <div class="icon-wrapper icon-main-wrpper" />
        <div class="content">
          {{ (currentUser.isAdmin && $route.path.slice(0, 6) === '/admin') ? '推文清單': '首頁' }}
        </div>
      </router-link>
      <router-link
        class="side-navbar-user-wrapper"
        :to="{name: $route.path.slice(0, 6) === '/admin' ?'admin-users':'user-tweets', params: {id: currentUser.id}}"
      >
        <div class="icon-wrapper icon-user-wrpper" />
        <div class="content">
          {{ (currentUser.isAdmin && $route.path.slice(0, 6) === '/admin') ? '使用者列表': '個人資料' }}
        </div>
      </router-link>
      <router-link
        class="side-navbar-setting-wrapper"
        :to="{name: $route.path.slice(0, 6) !== '/admin' ? 'setting': ''}"
      >
        <div
          v-if="$route.path.slice(0, 6) !== '/admin'"
          class="icon-wrapper icon-setting-wrpper"
        />
        <div
          v-if="$route.path.slice(0, 6) !== '/admin'"
          class="content"
        >
          設定
        </div>
      </router-link>
      <div
        v-if="$route.path.slice(0, 6) !== '/admin'"
        class="side-navbar-button-wrapper"
      >
        <label
          class="side-navbar-button toggle__label"
          for="toggle__control"
        >
          推文
        </label>
      </div>
    </div>
    <template>
      <input
        id="toggle__control"
        type="checkbox"
        class="toggle__control"
      >
      <NewPostModal @after-side-submit="handleAfterSubmit" />
    </template>
    <div class="bottom-item-container">
      <div
        class="side-navbar-logout-wrpper"
        @click="logout"
      >
        <div
          class="icon-wrapper icon-logout-wrapper"
        />
        <div class="content">
          登出
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './../assets/icon/logo.vue'
import NewPostModal from './../components/NewPostModal.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo,
    NewPostModal
  },
  data () {
    return {
      newTweet: {}
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/login')
    },
    handleAfterSubmit (data) {
      this.newTweet = data
      this.$emit('after-side-submit', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
a {
  cursor: inherit;
}
.side-navbar-container {
  width: 100%;
  max-width: 150px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px;
}
.nav-item-container {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50px;
  margin: 0 auto;
}
.bottom-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.side-navbar-setting-wrapper {
  height: 40px;
}
.side-navbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-wrapper {
  width: 40px;
  height: 40px;
}
.icon-main-wrpper {
  mask-image: url('./../assets/icon/icon_main.svg');
  -webkit-mask-image: url('./../assets/icon/icon_main.svg');
  cursor: pointer;
  @extend %icon-style;
  &:hover {
    background: $orange;
  }
}
.icon-user-wrpper {
  mask-image: url('./../assets/icon/icon_user.svg');
  -webkit-mask-image: url('./../assets/icon/icon_user.svg');
  cursor: pointer;
  @extend %icon-style;
  &:hover {
    background: $orange;
  }
}
.icon-setting-wrpper {
  mask-image: url('./../assets/icon/icon_setting.svg');
  -webkit-mask-image: url('./../assets/icon/icon_setting.svg');
  cursor: pointer;
  @extend %icon-style;
  &:hover {
    background: $orange;
  }
}
.icon-logout-wrapper {
  mask-image: url('./../assets/icon/icon_logout.svg');
  -webkit-mask-image: url('./../assets/icon/icon_logout.svg');
  cursor: pointer;
  @extend %icon-style;
  &:hover {
    background: $orange;
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
#toggle__control {
  display: none;
  &:checked {
    ~ .new__post__modal__form {
      display: block;
    }
  }
}

@media screen and (min-width: 768px) {
  .side-navbar-container {
    align-items: none;
    max-width: 330px;
  }
  .nav-item-container {
    width: 210px;
    align-items: normal;
  }
  .side-navbar-main-wrapper, .side-navbar-user-wrapper,
  .side-navbar-setting-wrapper, .side-navbar-logout-wrpper {
    display: flex;
    align-items: center;
    width: auto;
    text-decoration: none;
  }
  .side-navbar-main-wrapper, .side-navbar-user-wrapper,
  .side-navbar-setting-wrapper, .bottom-item-container {
    &:hover {
      .content {
        color: $orange;
      }
      .icon-main-wrpper, .icon-user-wrpper,
      .icon-setting-wrpper, .icon-logout-wrapper {
        background: $orange;
      }
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
    width: 210px;
    border-radius: 100px;
    background: $orange;
    color: #ffffff;
  }
  .bottom-item-container {
    width: 210px;
    justify-content: flex-start;
  }

}

</style>
