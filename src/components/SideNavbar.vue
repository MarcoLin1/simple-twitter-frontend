<template>
  <div class="side-navbar-container">
    <div class="nav-item-container">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <!-- user 畫面 -->
      <template v-if="!$route.path.includes('admin')">
        <router-link
          class="side-navbar-item"
          to="/mainpage"
        >
          <div class="icon-wrapper icon-main-wrapper" />
          <div class="content">
            首頁
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          to="/mainpage"
        >
          <div class="icon-wrapper icon-notify-wrapper" />
          <div class="content">
            <div class="notify-point" />
            通知
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          to="/mainpage"
        >
          <div class="icon-wrapper icon-mail-wrapper" />
          <div class="content">
            <div class="notify-point" />
            公開聊天室
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          to="/mainpage"
        >
          <div class="icon-wrapper icon-mail-wrapper" />

          <div class="content">
            私人訊息
            <div class="notify-point" />
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          :to="{name: 'user-tweets', params: {id: currentUser.id}}"
        >
          <div class="icon-wrapper icon-user-wrapper" />
          <div class="content">
            個人資料
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          to="/setting"
        >
          <div
            class="icon-wrapper icon-setting-wrapper"
          />
          <div class="content">
            設定
          </div>
        </router-link>
        <div
          class="side-navbar-item"
        >
          <label
            class="side-navbar-button toggle__label"
            for="toggle__control"
          >
            推文
          </label>
        </div>
      </template>
      <!-- admin畫面 -->
      <template v-else>
        <router-link
          class="side-navbar-item"
          to="/admin/tweets"
        >
          <div class="icon-wrapper icon-main-wrapper" />
          <div class="content">
            推文清單
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          to="/admin-users"
        >
          <div class="icon-wrapper icon-user-wrapper" />
          <div class="content">
            使用者列表
          </div>
        </router-link>
      </template>
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
        class="side-navbar-logout-wrapper"
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
  text-decoration: none;
}

.side-navbar-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.nav-item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  margin: 15px auto;
}
.side-navbar-item{
  display: flex;
  align-items: center;
  margin: 14px 0;
  &:hover{
    .icon-wrapper{
      background: $orange;
    }
    .content{
      color: $orange
    }
  }

}

.logo-wrapper{
  margin-bottom:30px;
}
.bottom-item-container {
  display: flex;
  .side-navbar-logout-wrapper{
    display: flex;
    align-items: center;
    &:hover{
      .icon-wrapper{
      background: $orange;
    }
      .content{
      color: $orange
    }
    }
  }
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
.icon-main-wrapper {
  mask-image: url('./../assets/icon/icon_main.svg');
  -webkit-mask-image: url('./../assets/icon/icon_main.svg');
  cursor: pointer;
  @extend %icon-style;
}
.icon-user-wrapper {
  mask-image: url('./../assets/icon/icon_user.svg');
  -webkit-mask-image: url('./../assets/icon/icon_user.svg');
  cursor: pointer;
  @extend %icon-style;

}
.icon-setting-wrapper {
  mask-image: url('./../assets/icon/icon_setting.svg');
  -webkit-mask-image: url('./../assets/icon/icon_setting.svg');
  cursor: pointer;
  @extend %icon-style;

}
.icon-logout-wrapper {
  mask-image: url('./../assets/icon/icon_logout.svg');
  -webkit-mask-image: url('./../assets/icon/icon_logout.svg');
  cursor: pointer;
  @extend %icon-style;

}
.icon-notify-wrapper{
    mask-image: url('./../assets/icon/icon_subscribe.svg');
    -webkit-mask-image: url('./../assets/icon/icon_subscribe.svg');
    cursor: pointer;
    @extend %icon-style;

  }
.icon-mail-wrapper{
    mask-image: url('./../assets/icon/icon_email.svg');
    -webkit-mask-image: url('./../assets/icon/icon_email.svg');
    cursor: pointer;
    @extend %icon-style;

}
.content {
  display: none;
  cursor: pointer;
  color: $black;
  text-decoration: none;
  position: relative;

  .notify-point{
    position: absolute;
    top: -2px;
    left: -29px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid  white;
    background-color: $orange;
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
