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
            :src="tweet.user.avatar"
            alt=""
            class="admin__tweets__list__image"
          >
        </div>
        <div class="admin__tweets__list__content__wrapper">
          <div class="admin__tweets__list__name__wrapper">
            <div class="admin__tweets__list__name">
              {{ tweet.user.name }}
            </div>
            <div class="admin__tweets__list__account">
              @ {{ tweet.user.account }} ·
            </div>
            <div class="admin__tweets__list__time">
              {{ tweet.createdAt }}
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
        avatar: 'https://loremflickr.com/320/240/people?random'
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
        avatar: 'https://loremflickr.com/320/240/people?random'
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
        avatar: 'https://loremflickr.com/320/240/people?random'
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
        avatar: 'https://loremflickr.com/320/240/people?random'
      }
    }
  ]
}

export default {
  name: 'AdminTweetsList',
  components: {
    TopNavbar: TopNavbar
  },
  data () {
    return {
      tweets: [],
      user: [],
      currentPage: '推文清單'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const { tweets } = dummyData
      this.tweets = tweets
      this.user = tweets.user
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
