<template>
  <div class="online_container">
    <div class="online_container__title">
      上線使用者 ({{ initialUsers.length || 0 }})
    </div>
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
  }
}
</script>
