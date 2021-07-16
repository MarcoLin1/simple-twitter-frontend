<template>
  <div class="online_container">
    <div class="online_container__title">
      上線使用者 ({{ users.length || 0 }})
    </div>
    <div
      v-for="user in users"
      :key="user.id"
      class="online_container__list"
    >
      <div class="online_container__list__avatar">
        <img
          :src="user.avatar"
          alt=""
          class="avatar-img"
        >
      </div>
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
  border: 1px solid $light-gray;
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
      margin: 0 10px;
      @include text-style(15px, 700, $black);
      &__account{
        margin-left: 6px;
        color: $tx-gray;
      }
    }
  }
}

</style>
<script>
const dummyUser = [
  {
    id: 1,
    name: 'tina',
    account: 'tina',
    avatar: 'https://i.imgur.com/S1Qaqcb.jpeg'
  },
  {
    id: 2,
    name: 'Marco',
    account: 'marco',
    avatar: 'https://i.imgur.com/S1Qaqcb.jpeg'
  },
  {
    id: 3,
    name: 'YJ',
    account: 'yj',
    avatar: 'https://i.imgur.com/S1Qaqcb.jpeg'
  },
  {
    id: 4,
    name: 'Tim',
    account: 'tim',
    avatar: 'https://i.imgur.com/S1Qaqcb.jpeg'
  }
]
export default {
  data () {
    return {
      users: dummyUser
    }
  }
}
</script>
