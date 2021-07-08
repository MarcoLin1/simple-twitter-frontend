<template>
  <div class="user-list-container">
    <div class="user-list-wrapper">
      <p class="title">
        跟隨誰
      </p>
      <div
        v-for="user in (showAll ? users :users.slice(0,6))"
        :key="user.id"
        class="user__list"
      >
        <div class="user__list__content">
          <div class="user__list__content__avator avatar-img" />
          <router-link to="/">
            <div class="user__list__content__title">
              <span class="user__list__content__title__name user-name">
                {{ user.name }}
              </span>
              <span
                class="user__list__content__title__account"
              >{{ user.account }}</span>
            </div>
          </router-link>
        </div>
        <div class="user__list__follow-btn">
          <button
            v-if="user.isFollowed"
            class="following-btn"
            @click="removeFollowing(user.id)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="to-follow-btn"
            @click="addFollowing(user.id)"
          >
            跟隨
          </button>
        </div>
      </div>
      <div
        class="read-more"
        @click="toggleShowAll"
      >
        {{ showAll ? '顯示更少' : '顯示更多' }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
a{
  text-decoration: none;
}
.user-list-container{
  margin: 15px 30px;
}
.user-list-wrapper{
  width: 350px;
  border-radius: 14px;
  background-color: $bg-gray;
  padding: 12px 15px;
}
.title{
  @include text-style(18px, 700, $black);
  margin-bottom: 10px;
  line-height: 26px;
}
.user__list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  position: relative;
  &::before{
    content: '';
    height: 1px;
    width: calc(100% + 30px);
    background: $light-gray;
    position: absolute;
    top: -1px;
    right: -15px;
  }
  &__content{
    display: flex;
    align-items: center;

    &__title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 18px;
      margin-left: 10px;
      &__account{
        @include text-style(15px, 700, $tx-gray, pointer);
      }
    }
  }
}
.read-more{
  @include text-style(15px, normal, $orange, pointer);
  margin: 2px 0;
  position: relative;
  padding-top: 12px;
  &::before{
    content: '';
    height: 1px;
    width: calc(100% + 30px);
    background: $light-gray;
    position: absolute;
    top: -1px;
    right: -15px;
  }

}
</style>
<script>
export default {
  data () {
    return {
      showAll: false,
      users: [
        {
          id: 1,
          name: 'Pizza Hut',
          account: '@pizzahut',
          isFollowed: true
        },
        {
          id: 2,
          name: 'McDonald\'s',
          account: '@McDonalds',
          isFollowed: true
        },
        {
          id: 3,
          name: 'Bank of America',
          account: '@BankOfAmerica',
          isFollowed: false
        },
        {
          id: 4,
          name: 'Pizza Hut',
          account: '@pizzahut',
          isFollowed: true
        },
        {
          id: 5,
          name: 'McDonald\'s',
          account: '@McDonalds',
          isFollowed: true
        },
        {
          id: 6,
          name: 'Bank of America',
          account: '@BankOfAmerica',
          isFollowed: false
        },
        {
          id: 7,
          name: 'Bank of America',
          account: '@BankOfAmerica',
          isFollowed: false
        },
        {
          id: 8,
          name: 'McDonald\'s',
          account: '@McDonalds',
          isFollowed: true
        },
        {
          id: 9,
          name: 'Bank of America',
          account: '@BankOfAmerica',
          isFollowed: false
        },
        {
          id: 10,
          name: 'Bank of America',
          account: '@BankOfAmerica',
          isFollowed: false
        }

      ]
    }
  },
  methods: {
    toggleShowAll () {
      this.showAll = !this.showAll
    },
    addFollowing (id) {
      this.users.filter((user) => {
        if (user.id === id) {
          user.isFollowed = true
        }
      })
    },
    removeFollowing (id) {
      this.users.filter((user) => {
        if (user.id === id) {
          user.isFollowed = false
        }
      })
    }

  }

}

</script>
