<template>
  <div class="middle-container">
    <template>
      <!-- <TopNavbar :current-page="currentPage" /> -->
    </template>
    <template>
      <UserEditModal
        :initial-user="user"
        @after-submit="afterHandleSubmit"
      />
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
        @click="showModal"
      >
        編輯個人資料
      </button>
      <button
        v-if="(currentUser.id !== user.id) && (isFollowing)"
        class="btn-border btn__following"
        @click.stop.prevent="removeFollowing(user.id)"
      >
        正在跟隨
      </button>
      <button
        v-if="(currentUser.id !== user.id) && (!isFollowing)"
        class="btn-border btn__unFollowing"
        @click.stop.prevent="addFollowing(user.id)"
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
      height: 200px;
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
      top:120px;
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
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'

export default {
  components: {
    UserEditModal
  },
  props: {
    getCurrentUser: {
      type: [Object, Array],
      required: true
    }
  },
  data () {
    return {
      user: [],
      currentUser: this.getCurrentUser,
      userFollowers: [],
      currentPage: 'userProfile',
      isFollowing: false
    }
  },
  watch: {
    getCurrentUser (newValue) {
      this.currentUser = {
        ...this.currentUser,
        ...newValue
      }
    }
  },
  created () {
    const { id } = this.$route.params
    console.log(this.$route)
    this.fetchUser(id)
    this.fetUserFollowers(id)
  },
  methods: {
    async fetUserFollowers (userId) {
      try {
        const { data } = await userAPI.getUserFollowers({ userId })
        this.userFollowers = data
        this.userFollowers.forEach(item => {
          if (item.followerId !== this.currentUser.id) {
            this.isFollowing = false
          } else {
            this.isFollowing = true
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async fetchUser (userId) {
      try {
        const { data } = await userAPI.getUser({ userId })
        this.user = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: 'user頁面資料讀取失敗'
        })
      }
    },
    addSubscribe () {
      // this.currentUsers = {
      //   ...this.currentUsers,
      //   isSubscribe: true
      // }
    },
    removeSubscribe () {
      // this.currentUsers = {
      //   ...this.currentUsers,
      //   isSubscribe: false
      // }
    },
    afterHandleSubmit (data) {
      this.user.name = data.name
      this.user.introduction = data.introduction
      if (data.avatar) {
        this.user.avatar = data.avatar
      }
      if (data.cover) {
        this.user.cover = data.cover
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await userAPI.addFollowShip({ id: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isFollowing = true
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '新增追蹤失敗'
        })
      }
    },
    async removeFollowing (userId) {
      try {
        const { data } = await userAPI.removeFollowShip({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isFollowing = false
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消追蹤失敗'
        })
      }
    },
    showModal () {
      const showModal = document.querySelector('#user__edit__modal')
      showModal.classList.remove('non__show')
      showModal.classList.add('show')
    }
  }
}
</script>
