<template>
  <div class="side-navbar-container">
    <div class="nav-item-container">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <!-- user 畫面 -->
      <template v-if="!$route.path.includes('admin')">
        <router-link
          class="side-navbar-item main-icon"
          to="/mainpage"
          :class="{selected:this.$route.path.includes('mainpage')}"
        >
          <div class="icon-wrapper icon-main-wrapper" />
          <div class="content">
            首頁
          </div>
        </router-link>
        <router-link
          class="side-navbar-item notify-icon"
          to="/notifications"
          :class="{selected:this.$route.path.includes('notifications')}"
        >
          <div class="icon-wrapper icon-notify-wrapper " />
          <!-- 通知點點 -->
          <div
            v-show="subscribeNotification"
            class="notify-color-point"
          />
          <div class="content">
            通知
          </div>
        </router-link>
        <router-link
          class="side-navbar-item open-chat-icon"
          to="/publicchat"
          :class="{selected:this.$route.path.includes('publicchat')}"
        >
          <div class="icon-wrapper icon-group-wrapper" />
          <div class="content">
            公開聊天室
          </div>
        </router-link>
        <router-link
          class="side-navbar-item mail-icon"
          to="/privatechat"
          :class="{selected:this.$route.path.includes('privatechat')}"
        >
          <div class="icon-wrapper icon-mail-wrapper " />
          <div
            v-show="getPrivateNotify"
            class="notify-point"
          >
            {{ getPrivateNotifyCount }}
          </div>
          <div class="content">
            私人訊息
          </div>
        </router-link>
        <router-link
          class="side-navbar-item user-icon"
          :to="{name: 'user-tweets', params: {id: currentUser.id}}"
          :class="{selected:this.$route.path.includes('/tweets')}"
        >
          <div class="icon-wrapper icon-user-wrapper" />
          <div class="content">
            個人資料
          </div>
        </router-link>
        <router-link
          class="side-navbar-item setting-icon"
          to="/setting"
          :class="{selected:this.$route.path.includes('/setting')}"
        >
          <div
            class="icon-wrapper icon-setting-wrapper"
          />
          <div class="content">
            設定
          </div>
        </router-link>
        <div
          class="side-navbar-item post-icon"
        >
          <label
            v-if="screenSize === 'mobile'"
            for="toggle__control"
          >
            <div

              class="icon-wrapper icon-post-wrapper"
            />
          </label>
          <label
            v-else
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
          :class="{selected:this.$route.path.includes('/admin/tweets')}"
        >
          <div class="icon-wrapper icon-main-wrapper" />
          <div class="content">
            推文清單
          </div>
        </router-link>
        <router-link
          class="side-navbar-item"
          to="/admin/users"
          :class="{selected:this.$route.path.includes('/admin/users')}"
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
    ...mapState(['currentUser', 'getPrivateNotify', 'getPrivateNotifyCount', 'subscribeNotification', 'screenSize'])
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$socket.disconnect()
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
  z-index: 2;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  border-top: 1px solid $light-gray;
}
.nav-item-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 15px auto;
  justify-content: space-evenly;

  .open-chat-icon, .user-icon, .setting-icon{
    display: none;
  }
  .main-icon{
    order: 1;
  }
  .post-icon{
    order:2;
  }
  .notify-icon{
    order: 3;
  }
  .mail-icon{
    order: 4;
  }

}
.side-navbar-item{
  display: flex;
  align-items: center;
  margin: 14px 0;
  position: relative;
  .notify-color-point{
    position: absolute;
    background-color: $orange;
    width: 10px;
    height: 10px;
    top: 6px;
    left: 19px;
    border-radius: 50%;
    border: 1px solid  white;
  }
  .notify-point{
    position: absolute;
    top: 1px;
    left: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid  white;
    background-color: $orange;
    font-size: 1px;
    line-height: 15px;
    color: white;
    text-align: center;
    font-weight: 400;
  }
  &:hover, &.selected{
    .icon-wrapper{
      background: $orange;
      transition: background 0.15s ease-in;
    }
    .content{
      color: $orange;
      transition: color 0.15s ease-in;
    }
  }

}

.logo-wrapper{
  display: none;
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
    mask-image: url('./../assets/icon/icon_ring.svg');
    -webkit-mask-image: url('./../assets/icon/icon_ring.svg');
    cursor: pointer;
    mask-size: 25px;
    @extend %icon-style;

  }
.icon-mail-wrapper{
    mask-image: url('./../assets/icon/icon_email.svg');
    -webkit-mask-image: url('./../assets/icon/icon_email.svg');
    cursor: pointer;
    @extend %icon-style;

}
.icon-group-wrapper{
  mask-image: url('./../assets/icon/icon_group.svg');
  -webkit-mask-image: url('./../assets/icon/icon_group.svg');
  cursor: pointer;
  mask-size: 25px;
  @extend %icon-style;
}
.icon-post-wrapper{
  mask-image: url('./../assets/icon/icon_post.svg');
  -webkit-mask-image: url('./../assets/icon/icon_post.svg');
  cursor: pointer;
  mask-size: 25px;
  @extend %icon-style;
}
.content {
  display: none;
  cursor: pointer;
  color: $black;
  text-decoration: none;
  position: relative;

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

.bottom-item-container {
  display: none;;
 }

#toggle__control {
  display: none;
  &:checked {
    ~ .new__post__modal__form {
      display: block;
    }
  }
}
@media screen and (min-width: 481px) {
  .side-navbar-container {
    position: static;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    border-top: none;

  }
  .logo-wrapper{
    display: block;
    margin-bottom:30px;
  }
  .nav-item-container {
    flex-direction: column;
    width: 50px;
    .open-chat-icon, .user-icon, .setting-icon{
      display: flex;
    }
    .main-icon, .post-icon, .notify-icon, .mail-icon{
      order: inherit;
    }
  }
  .bottom-item-container {
    display: block;
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
}

@media screen and (min-width: 1180px) {
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
    width: 100%;
    border-radius: 100px;
    background: $orange;
    color: #ffffff;
  }
  .bottom-item-container {
    width: 210px;
    justify-content: flex-start;
    margin-bottom: 20px;
    .icon-logout-wrapper{
       display: flex;
  }
  }

}

</style>
