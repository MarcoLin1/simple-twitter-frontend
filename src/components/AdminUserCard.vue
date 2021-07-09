<template>
  <div>
    <TopNavbar :current-page="currentPage" />
    <div class="right-container">
      <div
        v-for="user in users"
        :key="user.id"
        class="card__list"
      >
        <div class="card__list__cover">
          <img
            :src="user.cover"
            alt=""
          >
        </div>
        <div class="card__list__avatar">
          <img
            :src="user.avatar"
            alt=""
            class="avatar-img"
          >
        </div>

        <div class="card__list__detail">
          <div class="card__list__detail__name">
            {{ user.name }}
          </div>
          <div class="card__list__detail__account">
            @{{ user.account }}
          </div>
          <div class="card__list__detail__reaction d-flex ">
            <div class="card__list__detail__reaction__item">
              <div class="card__list__detail__reaction__item__message " />
              <span class="card__list__detail__reaction__item__text">1.5k</span>
            </div>
            <div class="card__list__detail__reaction__item">
              <div
                class="card__list__detail__reaction__item__heart"
              />
              <span
                class="card__list__detail__reaction__item__text"
              >20k</span>
            </div>
          </div>
          <!-- 要記得改連結 -->
          <div class="card__list__detail__follow">
            <div class="card__list__detail__follow__item">
              <router-link to="/">
                <span>{{ user.followingCount }} 個</span>
                <span>跟隨中</span>
              </router-link>
            </div>
            <div class="card__list__detail__follow__item">
              <router-link to="/">
                <span>{{ user.followerCount }} 位</span>
                <span>跟隨者</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
const dummyUser = [
  {
    id: 2,
    name: 'John Doe',
    account: 'heyjohne',
    avatar: 'https://i.imgur.com/27eBUkt.jpg',
    cover: 'https://i.imgur.com/ZDk9KqZ.png',
    introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    followerCount: 12,
    followingCount: 333
  },
  {
    id: 6,
    name: 'John Doe',
    account: 'heyjohne',
    avatar: 'https://i.imgur.com/27eBUkt.jpg',
    cover: 'https://i.imgur.com/ZDk9KqZ.png',
    introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    followerCount: 12,
    followingCount: 333
  },
  {
    id: 3,
    name: 'John Doe',
    account: 'heyjohne',
    avatar: 'https://i.imgur.com/27eBUkt.jpg',
    cover: 'https://i.imgur.com/ZDk9KqZ.png',
    introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    followerCount: 12,
    followingCount: 333
  },
  {
    id: 1,
    name: 'John Doe',
    account: 'heyjohne',
    avatar: 'https://i.imgur.com/27eBUkt.jpg',
    cover: 'https://i.imgur.com/ZDk9KqZ.png',
    introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    followerCount: 12,
    followingCount: 333
  },
  {
    id: 4,
    name: 'John Doe',
    account: 'heyjohne',
    avatar: 'https://i.imgur.com/27eBUkt.jpg',
    cover: 'https://i.imgur.com/ZDk9KqZ.png',
    introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    followerCount: 12,
    followingCount: 333
  }
]
export default {
  components: {
    TopNavbar
  },
  data () {
    return {
      users: {},
      currentPage: '推文清單'

    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.users = { ...dummyUser }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.right-container{
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(4, 245px);
  // grid-template-columns: repeat(auto-fit,minmax(245px,auto));
  grid-gap: 15px;
  border-top: 1px solid $light-gray;
}
a:hover{
  text-decoration-color: $black;

}
.card__list{
  width: 245px;
  overflow: hidden;
  background-color: $bg-gray;
  border-radius: 10px;
  position: relative;
  &__cover{
    height: 140px;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;

    }
  }
  &__avatar{
    img{
      position: absolute;
      width: 100px;
      height: 100px;
      border: 5px solid white;
      top:68px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &__detail{
    margin: 35px 15px 20px 15px;
    line-height: 23px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__name{
      @include text-style(15px, 900,$black);
    }
    &__account{
      @include text-style(15px, 500, $tx-gray);
      margin-top: 2px;
    }

  &__reaction {
      color: $tx-gray;
      margin-top: 17px;
      height: 20px;
      &__item {
        cursor: pointer;
        margin: 0 9px;
        display: flex;
        align-items: center;
        &:first-child:hover{
          div{
            background: $light-blue;
          }
          span{
            color: $light-blue;
          }
        }
        &:last-child:hover{
          div{
            background: $heart-pink;
          }
          span{
            color: $heart-pink;
          }
        }
        &__text {
          font-size: 15px;
          color: $black;
          line-height: 20px;
          margin-left: 6px;

        }
        &__message,&__heart, &__heart--liked{
          width: 20px;
          height: 20px;
          mask-size: 19px;
          @extend %icon-style;
        }
        &__message{
          // background-image: url(https://i.imgur.com/mcPjxeq.png);
          mask-image: url('./../assets/icon/icon_message.svg');
          -webkit-mask-image:url('./../assets/icon/icon_message.svg');
          background: $tx-gray;
        }

        &__heart{
          mask-image: url('./../assets/icon/icon_like.svg');
          -webkit-mask-image:url('./../assets/icon/icon_like.svg');
          background: $tx-gray;
          &--liked{
            mask-image: url('./../assets/icon/icon_isliked.svg');
            -webkit-mask-image:url('./../assets/icon/icon_isliked.svg');
            background-color: $heart-pink;
            width: 18px;
            height: 18px;
          }
        }

      }
  }
  &__follow{
      display: flex;
      margin-top: 16px;
      &__item{
        margin:  0 10px;
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
