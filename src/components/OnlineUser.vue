<template>
  <div class="online__user__container">
    <div class="online__user__top__wrapper">
      <div class="online__user__title">
        上線使用者 (3)
      </div>
    </div>
    <div class="online__user__list__wrapper">
      <div class="online__user__image">
        <img
          src="https://www.holoface.photos/static/images/products/figurephotohalf01.jpg"
          alt=""
          class="online__user__image"
        >
      </div>
      <div class="online__user__name">
        Johnny Wade Apple
      </div>
      <div class="online__user__account">
        @JWA
      </div>
    </div>
    <div class="online__user__list__wrapper">
      <div class="online__user__image">
        <img
          src="https://media.gq.com.tw/photos/60618e268f400a3df8cf9c1a/master/pass/lgtxGlA.png"
          alt=""
          class="online__user__image"
        >
      </div>
      <div class="online__user__name">
        Running Man
      </div>
      <div class="online__user__account">
        @Runner
      </div>
    </div>
    <div class="online__user__list__wrapper">
      <div class="online__user__image">
        <img
          src="https://www.mings-fashion.com/wp-content/uploads/2020/04/jordan-air-logo-png-transparent.png"
          alt=""
          class="online__user__image"
        >
      </div>
      <div class="online__user__name">
        Jordam Apple
      </div>
      <div class="online__user__account">
        @Japp
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .online__user__container {
    border: 1px solid $light-gray;
    height: 100vh;
    width: 500px;
    margin: 0 auto;
    background: #ecf0f3;
    .online__user__top__wrapper {
      border-bottom: 1px solid $light-gray;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
      padding: 13px 0 14px 16px;
    }
    .online__user__list__wrapper {
      border-bottom: 1px solid $light-gray;
      display: flex;
      align-items: center;
      padding: 10px;
      &:hover {
        box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
        border-radius: 20px;
        padding: 10px;
        cursor: pointer;
      }
      .online__user__image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }
      .online__user__name {
        font-weight: 700;
        margin-right: 10px;
      }
      .online__user__account {
        font-size: 0.8rem;
        color: $tx-gray;
      }
    }
  }
</style>

<script>
const socket = null
export default {
  data () {
    return {
      message: '555'
    }
  },
  methods: {
    sendMessage () {
      socket.emit('user', this.message)
    }
  }
}
</script>
