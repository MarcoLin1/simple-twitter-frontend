<template>
  <div class="middle-container">
    <template>
      <input
        id="user__edit__modal"
        type="checkbox"
        name="user__edit__modal"
      >
      <UserEditModal
        :initial-user="user"
        @after-submit="afterHandleSubmit"
      />
    </template>
    <div class="profile__cover">
      <img
        :src="user.cover | emptyCover"
        alt=""
        class="cover-img"
      >
    </div>
    <div class="profile__avatar">
      <img
        :src="user.avatar | emptyImage"
        alt=""
        class="avatar-img"
      >
    </div>
    <div
      class="profile__edit-btn"
    >
      <!-- 當現在頁面的user 不是 currentUser，就顯示icon -->
      <router-link
        to="/privatechat"
        @click.stop.prevent.native="getUserInfo"
      >
        <div
          v-if="(currentUser.id !== user.id)"
          class="profile__icon__wrapper"
        >
          <div class="profile__icon profile__icon__email" />
        </div>
      </router-link>
      <div
        v-if="(currentUser.id !== user.id) && (!isSubscribe)"
        class="profile__icon__wrapper"
        @click="addSubscribe(user.id)"
      >
        <div class="profile__icon profile__icon__subscribe" />
      </div>
      <div
        v-if="(currentUser.id !== user.id ) && (isSubscribe)"
        class="profile__icon__wrapper profile__icon__wrapper__checked"
        @click="removeSubscribe(user.id)"
      >
        <div class="profile__icon profile__icon__subscribe__checked" />
      </div>
      <!-- 當現在頁面的user 等於 currentUser，就顯示編輯個人資料按鈕，否則反之 -->
      <label
        for="user__edit__modal"
        class="user__edit__modal__label"
      >
        <div
          v-if="currentUser.id === user.id"
          class="btn-border"
        >
          編輯個人資料

        </div>
      </label>
      <button
        v-if="(currentUser.id !== user.id ) && (isFollowing)"
        class="btn-border btn__following"
        @click.stop.prevent="removeFollowing(user.id)"
      >
        正在跟隨
      </button>
      <button
        v-if="(currentUser.id !== user.id ) && (!isFollowing)"
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
      <div class="profile__detail__follow">
        <div class="profile__detail__follow__item">
          <router-link :to="{name: 'user-followings', params: {id: userId }}">
            <span>{{ user.followingCount + followingNum }} 個</span>
            <span>跟隨中</span>
          </router-link>
        </div>
        <div class="profile__detail__follow__item">
          <router-link :to="{name: 'user-followers', params: {id: userId }}">
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
    height: 200px;
    background-color: #999999;
    img{
      object-fit: cover;
      width: 600px;
      height: 200px;
    }
  }
  &__edit-btn{
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    .btn-border{
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
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
#user__edit__modal {
  display: none;
  &:checked {
    ~ .user__edit__modal__container {
      display: block;
    }
  }
}
</style>

<script>
import UserEditModal from './../components/UserEditModal.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'
import { emptyImageFilter } from './../utils/mixins'
import subscribeAPI from './../apis/subscribe'
export default {
  components: {
    UserEditModal
  },
  mixins: [emptyImageFilter],
  props: {
    getCurrentUser: {
      type: [Object, Array],
      required: true
    },
    initialUser: {
      type: [Object, Array],
      required: true
    },
    initialFollowing: {
      type: Boolean
    },
    userId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      user: this.initialUser,
      currentUser: this.getCurrentUser,
      isFollowing: this.initialFollowing,
      isSubscribe: false
    }
  },
  computed: {
    ...mapState(['followingNum', 'privateChatUser'])
  },
  watch: {
    getCurrentUser (newValue) {
      this.currentUser = {
        ...this.currentUser,
        ...newValue
      }
    },
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    },
    initialFollowing (newValue) {
      this.isFollowing = newValue
    }
  },
  methods: {
    getUserInfo () {
      this.privateChatUser.id = this.user.id
      this.privateChatUser.name = this.user.name
      this.privateChatUser.account = this.user.account

      console.log(this.user)
    },
    // 新增訂閱
    async addSubscribe (recipientId) {
      this.isSubscribe = true
      const { data } = await subscribeAPI.add({ recipientId, subscriberId: this.currentUser.id })
      console.log(data)
      if (data.status !== 'success') {
        throw new Error(data.message)
      }
    },
    // 移除訂閱
    async removeSubscribe (recipientId) {
      this.isSubscribe = false
      const { data } = await subscribeAPI.cancel({ recipientId, subscriberId: this.currentUser.id })
      console.log(data)
      if (data.status !== 'success') {
        throw new Error(data.message)
      }
    },
    // 接收user edit後的資料，再render到頁面
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
    // 增加追蹤
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
    // 移除追蹤
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
    }
  }
}
</script>
