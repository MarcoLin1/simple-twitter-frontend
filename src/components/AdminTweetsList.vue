<template>
  <div class="admin__tweets__list__container">
    <div
      v-if="$route.path.slice(0, 5) !== '/admin'"
      class="admin__tweets__list__main__wrapper"
    >
      <TopNavbar :current-page="currentPage" />
      <div
        v-for="tweet in tweets"
        :key="tweet.TweetId"
        class="admin__tweets__list__body__wrapper"
      >
        <div class="admin__tweets__list__image__wrapper">
          <img
            :src="tweet.User.avatar"
            alt=""
            class="admin__tweets__list__image"
          >
        </div>
        <div class="admin__tweets__list__content__wrapper">
          <div class="admin__tweets__list__name__wrapper">
            <div class="admin__tweets__list__name">
              {{ tweet.User.name }}
            </div>
            <div class="admin__tweets__list__account">
              @ {{ tweet.User.account }} ·
            </div>
            <div class="admin__tweets__list__time">
              {{ tweet.createdAt | shortenTime }}
            </div>
          </div>
          <div class="admin__tweets__list__wrapper">
            {{ tweet.description }}
          </div>
          <div class="admin__tweets__list__icon__wrapper">
            <button
              class="admin__tweets__list__icon"
              aria-hidden="true"
              @click.stop.prevent="deleteTweet(tweet.TweetId)"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
// import tweetAPI from './../apis/tweets'
import adminAPI from './../apis/admin'
import { shortenTimeFilter } from './../utils/mixins'
import { Toast } from '../utils/helper'

export default {
  name: 'AdminTweetsList',
  components: {
    TopNavbar: TopNavbar
  },
  mixins: [shortenTimeFilter],
  data () {
    return {
      tweets: [],
      user: [],
      currentPage: '推文清單'
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await adminAPI.tweet.get()
        this.tweets = data
        console.log(data)
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法讀取推文，請稍後再試'
        })
      }
    },
    deleteTweet (TweetId) {
      this.tweets = this.tweets.filter(tweet => tweet.TweetId !== TweetId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .admin__tweets__list__container {
    display: flex;
    height: 100vh;
  }
  .admin__tweets__list__main__wrapper {
    width: 100%;
  }
  .admin__tweets__list__body__wrapper {
    border-top: 1px solid $light-gray;
    display: flex;
    position: relative;
    padding-top: 10px;
    .admin__tweets__list__image__wrapper {
      margin-right: 10px;
      margin-left: 15px;
      .admin__tweets__list__image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .admin__tweets__list__name__wrapper {
    display: flex;
    margin-bottom: 5px;
    .admin__tweets__list__name {
      font-weight: 700;
      margin-right: 5px;
    }
    .admin__tweets__list__account, .admin__tweets__list__time {
      color: $tx-gray;
      font-size: 15px;
    }
  }
  .admin__tweets__list__wrapper {
    line-height: 22px;
    font-size: 15px;
    margin-bottom: 2rem;
  }
  .admin__tweets__list__icon {
    position: absolute;
    top: 5px;
    right: 20px;
    color: $tx-gray;
    font-size: 1.3rem;
    border: none;
    background: none;
    &:hover {
      color: $orange;
    }
  }
</style>
