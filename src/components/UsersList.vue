<template>
  <div class="users__list__container">
    <div class="users__list__top__navbar__container">
      <TopNavbar />
      <div class="users__list__item__wrapper">
        <div class="users__list__item">
          <button
            type="button"
            class="users__list__item__button"
          >
            跟隨者
          </button>
        </div>
        <div class="users__list__item">
          <button
            type="button"
            class="users__list__item__button"
          >
            正在跟隨
          </button>
        </div>
      </div>
    </div>
    <div class="users__list__main__container">
      <div
        v-for="tweet in tweets"
        :key="tweet.TweetId"
        class="users__list__main__wrapper"
      >
        <div class="users__list__image__wrapper">
          <img
            :src="tweet.user.avatar"
            alt=""
            class="users__list__image"
          >
        </div>
        <div class="users__list__content__wrapper">
          <div class="users__list__name__wrapper">
            <div class="users__list__name">
              {{ tweet.user.name }}
            </div>
            <div class="users__list__account">
              @{{ tweet.user.account }}
            </div>
          </div>
          <div class="users__list__text__wrapper">
            {{ tweet.description }}
          </div>
          <div class="users__list__button__wrapper">
            <button
              v-if="tweet.user.isFollowing"
              type="submit"
              class="users__list__button__following"
            >
              正在跟隨
            </button>
            <button
              v-else
              type="submit"
              class="users__list__button__unfollowing"
            >
              跟隨
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
const dummyData = {
  tweets: [
    {
      TweetId: 1,
      description: 'It is very hard to overcome this question',
      createdAt: '2019',
      replyCount: 1,
      likeCount: 1,
      isLike: true,
      user: {
        UserId: 1,
        name: 'apple',
        account: 'apple',
        avatar: 'https://loremflickr.com/320/240/people?random',
        isFollowing: true
      }
    },
    {
      TweetId: 2,
      description: 'It is very hard to overcome this question',
      createdAt: '2020',
      replyCount: 2,
      likeCount: 2,
      isLike: true,
      user: {
        UserId: 2,
        name: 'pen',
        account: 'pen',
        avatar: 'https://loremflickr.com/320/240/people?random',
        isFollowing: false
      }
    },
    {
      TweetId: 3,
      description: 'It is very hard to overcome this question',
      createdAt: '2023',
      replyCount: 3,
      likeCount: 3,
      isLike: true,
      user: {
        UserId: 3,
        name: 'dog',
        account: 'DG',
        avatar: 'https://loremflickr.com/320/240/people?random',
        isFollowing: false
      }
    },
    {
      TweetId: 4,
      description: 'It is very hard to overcome this question',
      createdAt: '2016',
      replyCount: 4,
      likeCount: 4,
      isLike: true,
      user: {
        UserId: 4,
        name: 'google',
        account: 'GG',
        avatar: 'https://loremflickr.com/320/240/people?random',
        isFollowing: true
      }
    }
  ]
}
export default {
  components: {
    TopNavbar
  },
  data () {
    return {
      tweets: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const { tweets } = dummyData
      this.tweets = tweets
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  %text-normal-style {
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
  }
  .users__list__container {
    border: 1px solid $light-gray;
    width: auto;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;

    .users__list__item__wrapper {
      display: flex;
      width: 40%;
      justify-content: space-around;
      .users__list__item {
        width: 100%;
        text-align: center;
        @extend %text-normal-style;
      }
      .users__list__item__button {
        width: 100%;
        border: none;
        background: none;
        padding-bottom: 14px;
        color: $tx-gray;
      &:focus {
          border-bottom: 1px solid $orange;
          color: $orange;
        }
      &:hover {
        color: $orange;
      }
      }
    }
  }
  .users__list__main__wrapper {
    display: flex;
    position: relative;
    padding: 10px 15px 10px 15px;
    border-top: 1px solid $light-gray;
    .users__list__image__wrapper {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .users__list__image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .users__list__name__wrapper {
      .users__list__name {
        @extend %text-normal-style;
        margin-bottom: 5px;
      }
      .users__list__account {
        margin-bottom: 5px;
        color: $tx-gray;
        font-size: 15px;
      }
    }
    .users__list__text__wrapper {
      line-height: 22px;
      color: $black;
      font-size: 15px;
    }
    .users__list__button__wrapper {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .users__list__button__following {
        width: 100%;
        height: 30px;
        border-radius: 100px;
        background: $orange;
        color: #ffffff;
        border: none;
        font-size: 15px;
        padding: 8px 16px 8px 16px;
      }
      .users__list__button__unfollowing {
        width: 62px;
        height: 30px;
        border-radius: 100px;
        border: 1px solid $orange;
        background: none;
        color: $orange;
      }
    }
  }
</style>
