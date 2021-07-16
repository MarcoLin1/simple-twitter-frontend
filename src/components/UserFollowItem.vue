<template>
  <div class="users__list__top__navbar__container">
    <div class="users__list__item__wrapper">
      <div class="users__list__item">
        <!-- 記得改網址 -->
        <router-link
          :to="{name: 'user-followers'}"
          type="button"
          class="users__list__item__button"
          :class="{checked:$route.path.includes('followers')}"
        >
          跟隨者
        </router-link>
      </div>
      <div class="users__list__item">
        <!-- 記得改網址 -->
        <router-link
          :to="{name: 'user-followings'}"
          type="button"
          class="users__list__item__button"
          :class="{checked:$route.path.includes('followings')}"
        >
          正在跟隨
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  %text-normal-style {
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
  }
  .users__list__item__wrapper {
    display: flex;
    width: 40%;
    justify-content: space-around;
    .users__list__item {
      width: 130px;
      text-align: center;
      @extend %text-normal-style;
    }
    .users__list__item__button {
      width: 100%;
      border: none;
      background: none;
      padding-bottom: 14px;
      color: $tx-gray;
      text-decoration: none;
      &:hover {
        color: $orange;
      }
      &:focus {
        border-bottom: 1px solid $orange;
        color: $orange;
      }
      &.checked {
        color: $orange;
        border-bottom: 1px solid $orange;
      }
    }
  }
</style>
