<template>
  <router-link
    class="side-navbar-main-wrapper"
    :to="{name:{name}, params:{params}}"
  >
    {{ name }} {{ params }}
    <div
      class="icon-wrapper"
      :class="initialNavItem.icon"
    />
    <div class="content">
      {{ initialNavItem.title }}
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    initialNavItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      item: this.initialNavItem,
      name: this.initialNavItem.link.name,
      params: this.initialNavItem.link.params
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
