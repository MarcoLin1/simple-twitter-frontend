<template>
  <div class="middle-container">
    <template>
      <TopNavbar :current-page="currentPage" />
    </template>
    <template>
      <UserEditModal />
    </template>
    <div class="profile__cover">
      <img
        :src="user.cover"
        alt=""
      >
    </div>
    <div class="profile__avatar">
      <img
        :src="user.avatar"
        alt=""
        class="avatar-img"
      >
    </div>
    <div
      class="profile__edit-btn"
    >
      <!-- 當現在頁面的user 不是 currentUser，就顯示icon -->
      <div
        v-if="(currentUser.id !== user.id)"
        class="profile__icon__wrapper"
      >
        <div class="profile__icon profile__icon__email" />
      </div>
      <div
        v-if="(currentUser.id !== user.id) && (!currentUser.isSubscribe)"
        class="profile__icon__wrapper"
        @click="addSubscribe"
      >
        <div class="profile__icon profile__icon__subscribe" />
      </div>
      <div
        v-if="(currentUser.id !== user.id) && (currentUser.isSubscribe)"
        class="profile__icon__wrapper profile__icon__wrapper__checked"
        @click="removeSubscribe"
      >
        <div class="profile__icon profile__icon__subscribe__checked" />
      </div>
      <!-- 當現在頁面的user 等於 currentUser，就顯示編輯個人資料按鈕，否則反之 -->
      <button
        v-if="currentUser.id === user.id"
        class="btn-border"
        data-toggle="modal"
        data-target="#user__edit__modal"
      >
        編輯個人資料
      </button>
      <button
        v-if="(currentUser.id !== user.id) && (currentUser.isFollowing)"
        class="btn-border btn__following"
        @click="removeFollowing"
      >
        正在跟隨
      </button>
      <button
        v-if="(currentUser.id !== user.id) && (!currentUser.isFollowing)"
        class="btn-border btn__unFollowing"
        @click="addFollowing"
      >
        跟隨
      </button>
    </div>

    <div class="profile__detail">
      <div class="profile__detail__name">
        {{ user.name }}
      </div>
      <div class="profile__detail__account">
        @{{ user.account }}
      </div>
      <div class="profile__detail__intro">
        {{ user.introduction }}
      </div>
      <!-- 要記得改連結 -->
      <div class="profile__detail__follow">
        <div class="profile__detail__follow__item">
          <router-link to="/">
            <span>{{ user.followingCount }} 個</span>
            <span>跟隨中</span>
          </router-link>
        </div>
        <div class="profile__detail__follow__item">
          <router-link to="/">
            <span>{{ user.followerCount }} 位</span>
            <span>跟隨者</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
a:hover{
  text-decoration-color: $black;

}
.middle-container{
  width: 600px;
  position: relative;
}
.profile{
  &__cover{
    width: 100%;
    img{
      width: 598px;
      height: auto;
    }
  }
  &__edit-btn{
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    .btn-border{
      height: 40px;
    }
    .btn__following {
      background: $orange;
      color: #ffffff;
    }

  }
  &__avatar{
    img{
      position: absolute;
      width: 140px;
      height: 140px;
      border: 5px solid white;
      top:175px;
      left: 14px;
    }
  }
  &__detail{
    margin: 20px 15px;
    line-height: 22px;
    &__name{
      @include text-style(19px, 900,$black);
    }
    &__account{
      @include text-style(15px, 500, $tx-gray);
    }
    &__intro{
      @include text-style(14px, 400,black);
      margin: 10px 0 ;
    }
    &__follow{

      display: flex;
      &__item{
        margin-right: 20px;
        font-size: 0;
        span{
          @include text-style(14px, 500, $tx-gray,pointer);
          &:first-child ,.active{
            cursor: pointer;
            color: $black;
          }
        }
      }
    }

  }

}
.profile__icon__wrapper {
  border: 1px solid $orange;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  .profile__icon__email, .profile__icon__subscribe, .profile__icon__subscribe__checked {
    @extend %icon-style;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .profile__icon__email {
    mask-image: url('./../assets/icon/icon_email.svg');
    -webkit-mask-image: url('./../assets/icon/icon_email.svg');
    background: $orange;
  }
  .profile__icon__subscribe {
    mask-image: url('./../assets/icon/icon_subscribe.svg');
    -webkit-mask-image: url('./../assets/icon/icon_subscribe.svg');
    background: $orange;
  }
  .profile__icon__subscribe__checked {
    mask-image: url('./../assets/icon/icon_subscribe_checked.svg');
    -webkit-mask-image: url('./../assets/icon/icon_subscribe_checked.svg');
    background: #ffffff;
  }
}
.profile__icon__wrapper__checked {
  background: $orange;
}
</style>

<script>
import UserEditModal from './../components/UserEditModal.vue'
import TopNavbar from './../components/TopNavbar.vue'
const dummyUser =
    {
      id: 1,
      name: 'John Doe',
      account: 'heyjohne',
      avatar: 'https://i.imgur.com/27eBUkt.jpg',
      cover: 'https://i.imgur.com/ZDk9KqZ.png',
      introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      followerCount: 12,
      followingCount: 333
    }
const currentUser =
    {
      id: 2,
      name: 'Joy',
      account: 'hellojoy',
      avatar: 'https://i.imgur.com/27eBUkt.jpg',
      cover: 'https://i.imgur.com/ZDk9KqZ.png',
      introduction: 'No you minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      followerCount: 12,
      followingCount: 333,
      isSubscribe: true,
      isFollowing: true
    }
export default {
  components: {
    UserEditModal,
    TopNavbar
  },
  data () {
    return {
      user: {},
      currentUser: [],
      currentPage: 'userProfile'
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.user = { ...dummyUser }
      this.currentUser = { ...currentUser }
    },
    addSubscribe () {
      this.currentUser = {
        ...this.currentUser,
        isSubscribe: true
      }
    },
    removeSubscribe () {
      this.currentUser = {
        ...this.currentUser,
        isSubscribe: false
      }
    },
    addFollowing () {
      this.currentUser = {
        ...this.currentUser,
        isFollowing: true
      }
    },
    removeFollowing () {
      this.currentUser = {
        ...this.currentUser,
        isFollowing: false
      }
    }
  }
}
</script>
