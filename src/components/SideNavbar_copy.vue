<template>
  <div class="side-navbar-container">
    <div class="nav-item-container">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <SideNavBarItem
        :initial-id="userId"
      />
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
import Logo from '../assets/icon/logo.vue'
import NewPostModal from './NewPostModal.vue'
import SideNavBarItem from './SideNavBarItem.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo,
    NewPostModal,
    SideNavBarItem
  },
  data () {
    return {
      newTweet: {},
      userId: 0

    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.userId = this.currentUser.id
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
#toggle__control {
  display: none;
  &:checked {
    ~ .new__post__modal__form {
      display: block;
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
  }

}

</style>
