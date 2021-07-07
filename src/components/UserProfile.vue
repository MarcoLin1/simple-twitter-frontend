<template>
  <div class="middle-container">
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
      <button class="btn-border">
        編輯個人資料
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

  }
  &__avatar{
    img{
      position: absolute;
      width: 140px;
      height: 140px;
      border: 5px solid white;
      top:130px;
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
</style>
<script>
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
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.user = { ...dummyUser }
    }
  }
}
</script>
