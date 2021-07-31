<template>
  <div class="background">
    <div class="side-navbar-container">
      <div class="nav-item-container">
        <div class="logo-wrapper">
          <router-link :to="{name:'user-tweets', params:{id: currentUser.id}}">
            <div class="side-navbar__image">
              <img
                class="avatar-img"
                :src="currentUser.avatar | emptyImage"
                alt=""
              >
              <div class="side-navbar__name">
                Hi {{ currentUser.name }}！
              </div>
            </div>
          </router-link>

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="close-btn"
            @click="$emit('close')"
          ><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" /></g></svg>
        </div>
        <!-- user 畫面 -->
        <template v-if="!$route.path.includes('admin')">
          <router-link
            class="side-navbar-item"
            to="/mainpage"
            :class="{selected:this.$route.path.includes('mainpage')}"
            @click.stop.prevent.native="$emit('close')"
          >
            <div class="icon-wrapper icon-main-wrapper" />
            <div class="content">
              首頁
            </div>
          </router-link>
          <router-link
            class="side-navbar-item"
            to="/notifications"
            :class="{selected:this.$route.path.includes('notifications')}"
            @click.stop.prevent.native="$emit('close')"
          >
            <div class="icon-wrapper icon-notify-wrapper" />
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
            class="side-navbar-item"
            to="/publicchat"
            :class="{selected:this.$route.path.includes('publicchat')}"
            @click.stop.prevent.native="$emit('close')"
          >
            <div class="icon-wrapper icon-group-wrapper" />
            <div class="content">
              公開聊天室
            </div>
          </router-link>
          <router-link
            class="side-navbar-item"
            to="/privatechat"
            :class="{selected:this.$route.path.includes('privatechat')}"
            @click.stop.prevent.native="$emit('close')"
          >
            <div class="icon-wrapper icon-mail-wrapper" />
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
            class="side-navbar-item"
            :to="{name: 'user-tweets', params: {id: currentUser.id}}"
            :class="{selected:this.$route.path.includes('/tweets')}"
            @click.stop.prevent.native="$emit('close')"
          >
            <div class="icon-wrapper icon-user-wrapper" />
            <div class="content">
              個人資料
            </div>
          </router-link>
          <router-link
            class="side-navbar-item"
            to="/setting"
            :class="{selected:this.$route.path.includes('/setting')}"
            @click.stop.prevent.native="$emit('close')"
          >
            <div
              class="icon-wrapper icon-setting-wrapper"
            />
            <div class="content">
              設定
            </div>
          </router-link>
        </template>
      </div>
      <div class="bottom-item-container">
        <div
          class="side-navbar-logout-wrapper"
          @click="logout & $emit('close')"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter } from './../utils/mixins'

export default {
  mixins: [emptyImageFilter],
  props: {
    openMenu: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newTweet: {}
    }
  },
  computed: {
    ...mapState(['currentUser', 'getPrivateNotify', 'getPrivateNotifyCount', 'subscribeNotification'])
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
.background{
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.side-navbar-container {
  box-shadow: 0px 2px 10px 3px rgba(29,26,26,0.5);
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}
.nav-item-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 15px 0;
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
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid $light-gray;
  padding-bottom: 8px;
  svg{
    display: block;
    margin: auto 0;
  }
  .close-btn{
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 27px;
    right: 15px;
  }
  .side-navbar__image{
    display: flex;
  }
  .side-navbar__name{
    color: $black;
    cursor: pointer;
    font-weight: 500;
    margin: auto 0 auto 6px;
  }
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
.content {
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
#toggle__control {
  display: none;
  &:checked {
    ~ .new__post__modal__form {
      display: block;
    }
  }
}

// @media screen and (min-width: 1180px) {
//   .side-navbar-container {
//     align-items: none;
//     max-width: 330px;
//   }
//   .nav-item-container {
//     width: 210px;
//     align-items: normal;
//   }

//   .content {
//     display: block;
//     width: 100%;
//     margin-left: 20px;
//     font-weight: 700;
//     font-size: 18px;
//     &:hover {
//       color: $orange;
//     }
//   }
//   .side-navbar-button {
//     width: 100%;
//     border-radius: 100px;
//     background: $orange;
//     color: #ffffff;
//   }
//   .bottom-item-container {
//     width: 210px;
//     justify-content: flex-start;
//   }

// }

</style>
