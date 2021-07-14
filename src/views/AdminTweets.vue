<template>
  <div class="admin__tweets__list__container">
    <div
      v-if="$route.path.slice(0, 5) !== '/admin'"
      class="admin__tweets__list__main__wrapper"
    >
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
              :disabled="isProcessing"
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
  <!-- <div>
    <AdminTweetsList />
  </div> -->
</template>

<script>
import tweetAPI from './../apis/tweets'
import adminAPI from './../apis/admin'
import { shortenTimeFilter } from './../utils/mixins'
import { Toast } from '../utils/helper'
import Swal from 'sweetalert2'

export default {
  name: 'AdminTweetsList',
  components: {
  },
  mixins: [shortenTimeFilter],
  data () {
    return {
      isProcessing: false,
      tweets: [],
      user: []
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await tweetAPI.getTweets()
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
    async deleteTweet (tweetId) {
      try {
        this.isProcessing = true
        // 跳出sweet alert 確認使用者是否要刪除
        const result = await Swal.fire({
          title: '確定要刪除該則推文嗎？',
          text: '刪除後將無法復原！',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#657786',
          confirmButtonColor: '#ff6600',
          confirmButtonText: '確定刪除',
          cancelButtonText: '取消'
        })
        // 如果要刪除，則會串刪除的API
        if (result.isConfirmed) {
          const { data } = await adminAPI.tweet.delete({ tweetId: tweetId.toString() })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
          // 確認沒問題後才會更新tweets列表及跳出刪除成功提醒
          this.tweets = this.tweets.filter(tweet => tweet.TweetId !== tweetId)
          Swal.fire(
            '刪除成功!',
            '該則貼文已刪除',
            'success'
          )
          this.isProcessing = false
        } else {
          this.isProcessing = false
          return
        }
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法刪除該推文，請稍後再試'
        })
      }
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
    margin-right: 50px;
    width: 65em;
    letter-spacing: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
