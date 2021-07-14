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
              <span class="card__list__detail__reaction__item__text">
                {{ user.tweetCount | toThousand }}</span>
            </div>
            <div class="card__list__detail__reaction__item">
              <div
                class="card__list__detail__reaction__item__heart"
              />
              <span
                class="card__list__detail__reaction__item__text"
              >{{ user.likeCount | toThousand }}</span>
            </div>
          </div>
          <!-- 要記得改連結 -->
          <div class="card__list__detail__follow">
            <div class="card__list__detail__follow__item">
              <router-link to="/">
                <span>{{ user.followingCount | toThousand }} 個</span>
                <span>跟隨中</span>
              </router-link>
            </div>
            <div class="card__list__detail__follow__item">
              <router-link to="/">
                <span>{{ user.followerCount | toThousand }} 位</span>
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
import { Toast } from '../utils/helper'
import TopNavbar from './../components/TopNavbar.vue'
import adminAPI from './../apis/admin'
import { shortenNumberFilter } from './../utils/mixins'
export default {
  components: {
    TopNavbar
  },
  mixins: [shortenNumberFilter],
  data () {
    return {
      users: [],
      currentPage: '使用者列表'
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await adminAPI.users.get()
        console.log(data)
        this.users = data
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法讀取所有使用者，請稍後再試'
        })
      }
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
  &:hover{
    box-shadow: 5px 5px 10px -2px rgba(0, 9, 12, 0.45);
  }
  &__cover{
    height: 140px;
    background-color: $img-light-gray;
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
      cursor: default;
    }
  }
  &__detail{
    margin: 35px 15px 20px 15px;
    line-height: 23px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__name{
      @include text-style(15px, 900, $black, default);
    }
    &__account{
      @include text-style(15px, 500, $tx-gray, default);
      margin-top: 2px;
    }

  &__reaction {
      color: $tx-gray;
      margin-top: 17px;
      height: 20px;
      &__item {
        cursor: default;
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
          @include text-style(14px, 500, $tx-gray,default);
          &:first-child ,.active{
            color: $black;
          }
        }
      }
    }
  }

}

</style>
