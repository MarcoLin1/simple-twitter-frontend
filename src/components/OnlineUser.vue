<template>
  <div class="online_container">
    <template v-if="$route.path.includes('public')">
      <div

        class="online_container__title"
      >
        上線使用者 ({{ initialUsers.length || 0 }})
      </div>
    </template>
    <template v-else>
      <div
        class="online_container__title"
      >
        訊息
        <div class="icon-image" />
        <div class="plus">
          +
        </div>
      </div>
    </template>
    <div
      v-for="user in initialUsers"
      :key="user.user_id"
      class="online_container__list"
    >
      <router-link :to="{ name:'user-tweets', params:{id: user.user_id} }">
        <div class="online_container__list__avatar">
          <img
            :src="user.avatar"
            alt=""
            class="avatar-img"
          >
        </div>
      </router-link>
      <div class="online_container__list__info">
        <span class="online_container__list__info__name user-name">{{ user.name }}</span>
        <span class="online_container__list__info__account">@{{ user.account }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.online_container{
  min-height: 100vh;
  width: 400px;
  &__title{
    height: 55px;
    line-height: 55px;
    @include text-style(18px, 700, $black);
    padding: 0  15px;
    border-bottom: 1px solid $light-gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .plus{
        position: absolute;
        top: 14px;
        right: 16px;
        font-size: 1px;
        width: 10px;
        height: 10px;
        color: black;
        background-color: white;
        line-height: 8px;
        border-radius: 50%;
        text-align: center;
        border: 1px solid white;

      }
    .icon-image{
      width: 30px;
      height: 30px;
      mask-image: url('./../assets/icon/icon_email.svg');
      -webkit-mask-image: url('./../assets/icon/icon_email.svg');
      cursor: pointer;
      @extend %icon-style;

    }
  }
  &__list{
    display: flex;
    padding: 15px;
    align-items: center;
    border-bottom: 1px solid $light-gray;
    &__info{
      cursor: default;
      margin: 0 10px;
      @include text-style(15px, 700, $black);
      &__name{
        cursor: default;
      }
      &__account{
        cursor: default;
        margin-left: 6px;
        color: $tx-gray;
      }
    }
  }
}
</style>
<script>
export default {
  name: 'OnlineUser',
  props: {
    initialUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      users: this.initialUsers
    }
  },
  watch: {
    initialUsers (newValue) {
      this.users = [
        ...this.users,
        ...newValue
      ]
    }
  }
}
</script>
