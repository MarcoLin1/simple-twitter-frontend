<template>
  <div class="">
    <div class="tweet__info__container">
      <div class="tweet__info__top__wrapper">
        <div class="tweet__info__image_wrapper">
          <img
            :src="tweet.User.avatar"
            alt="使用者的大頭貼"
            class="tweet__info__image"
          >
        </div>
        <div class="tweet__info__title__wrapper">
          <div class="tweet__info__name">
            {{ tweet.User.name }}
          </div>
          <div class="tweet__info__account">
            @{{ tweet.User.account }}
          </div>
        </div>
      </div>
      <div class="tweet__info__text__wrapper">
        <div class="tweet__info__text">
          {{ tweet.description }}
        </div>
      </div>
      <div class="tweet__info__time__wrapper">
        <div class="tweet__info__date">
          {{ tweet.createdAt | localTime }}
        </div>
      </div>
      <div class="tweet__info__reply__wrapper">
        <div class="tweet__info__reply__number">
          {{ tweet.replyCount }}
          <span class="tweet__info__rely__text">回覆</span>
        </div>
        <div class="tweet__info__like__number">
          {{ tweet.likeCount }}
          <span class="tweet__info__like__text">喜歡次數</span>
        </div>
      </div>
      <div class="tweet__info__icon__wrapper">
        <router-link :to="{name:'reply-post-modal', params:{id:tweet.id}}">
          <div
            class="tweet__info__icon__message__wrapper"
            @click="showModal = true"
          >
            <div
              class="tweet__info__icon__message"
              data-toggle="modal"
              data-target="#reply__post__modal"
            />
          </div>
        </router-link>
        <div class="tweet__info__icon__like__wrapper">
          <div
            v-if="!tweet.isLike"
            class="tweet__info__icon__like"
            @click.prevent.stop="addLiked(tweet.id)"
          />
          <div
            v-else
            class="tweet__info__icon__like--liked"
            @click.prevent.stop="removeLiked(tweet.id)"
          />
        </div>
        <template
          v-if="showModal"
        >
          <ReplyPostModal
            :initial-tweet="initialTweet"
            @close="showModal = false"
            @after-submit="handleAfterSubmit"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
// import ReplyPostModal from './../components/ReplyPostModal.vue'
import ReplyPostModal from './../components/ReplyPostModal.vue'
import userAPI from './../apis/users'
import { localTimeFilter } from './../utils/mixins'
import { Toast } from '../utils/helper'
export default {
  components: {
    ReplyPostModal
    // ReplyPostModal
  },
  mixins: [localTimeFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      currentPage: '推文',
      tweet: this.initialTweet
    }
  },
  watch: {
    initialTweet (newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue
      }
    }
  },
  methods: {
    handleAfterSubmit (replyData) {
      this.$emit('after-submit', replyData.comment)
    },
    async addLiked (tweetId) {
      try {
        const { data } = await userAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log(data)
        this.tweet.isLike = true
        this.tweet.likeCount = this.tweet.likeCount + 1
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '喜歡貼文失敗，請稍候再試'
        })
      }
    },
    async removeLiked (tweetId) {
      try {
        const { data } = await userAPI.removeLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log(data)

        this.tweet.isLike = false
        // likeCount 不能有負值
        this.tweet.likeCount = this.tweet.likeCount > 0 ? this.tweet.likeCount -= 1 : 0
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消喜歡失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .tweet__info__container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 15px 0 15px;
    border-top: 1px solid $light-gray;
    border-bottom: 1px solid $light-gray;
  }
  .tweet__info__top__wrapper {
    display: flex;
    align-items: center;
    margin: 15px 0 15px 0;
    .tweet__info__image_wrapper {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .tweet__info__image {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
  .tweet__info__name, .tweet__info__account {
    font-size: 15px;
    line-height: 21px;
  }
  .tweet__info__name {
    font-weight: 700;
    color: $black;
  }
  .tweet__info__account {
    color: $tx-gray;
  }
  .tweet__info__text__wrapper {
    margin-bottom: 15px;
    .tweet__info__text {
      color: $black;
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }
  .tweet__info__time__wrapper {
    display: flex;
    color: $tx-gray;
    font-size: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid $light-gray;
  }
  .tweet__info__reply__wrapper {
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid $light-gray;
    font-size: 15px;
    .tweet__info__reply__number {
      margin-right: 20px;
      font-weight: bold;
    }
    .tweet__info__like__number {
      font-weight: bold;
    }
    .tweet__info__rely__text, .tweet__info__like__text  {
      font-weight: normal;
      color: $tx-gray
    }
  }
  .tweet__info__icon__wrapper {
    display: flex;
    justify-content: space-between;
    width: auto;
    max-width: 150px;
    margin-top: 5px;
    margin-bottom: 5px;
    .tweet__info__icon__message__wrapper, .tweet__info__icon__like__wrapper {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: $orange;
      }
    }
    .tweet__info__icon__message {
      width: 30px;
      height: 30px;
      @extend %icon-style;
      mask-image: url('./../assets/icon/icon_message.svg');
      -webkit-mask-image: url('./../assets/icon/icon_message.svg');
      cursor: pointer;
      &:hover {
        background: #ffffff;
      }
    }
    .tweet__info__icon__like {
      width: 30px;
      height: 30px;
      @extend %icon-style;
      mask-image: url('./../assets/icon/icon_like.svg');
      -webkit-mask-image: url('./../assets/icon/icon_like.svg');
      cursor: pointer;
      &:hover {
        background: #ffffff;
      }
    }
    .tweet__info__icon__like--liked {
      width: 30px;
      height: 30px;
      mask-size: 30px;
      background-color: $heart-pink;
      @extend %icon-style;
      mask-image: url('./../assets/icon/icon_isliked.svg');
      -webkit-mask-image: url('./../assets/icon/icon_isliked.svg');
      cursor: pointer
    }
  }

  @media screen and (min-width: 576px) {
    .tweet__info__text__wrapper {
      .tweet__info__text {
        font-size: 23px;
        line-height: 34px;
      }
    }
    .tweet__info__reply__wrapper {
      margin-top: 20px;
      padding-bottom: 20px;
      font-size: 19px;
    }
    .tweet__info__icon__wrapper {
      margin-top: 20px;
      margin-bottom: 14px;
      max-width: 200px;
      .tweet__info__icon__message__wrapper, .tweet__info__icon__like__wrapper {
        width: auto;
        height: auto;
        border-radius: none;
        &:hover {
          background: inherit;
        }
      }
      .tweet__info__icon__message {
        mask-image: url('./../assets/icon/icon_reply.svg');
        -webkit-mask-image: url('./../assets/icon/icon_reply.svg');
        &:hover {
          background: $orange;
        }
      }
      .tweet__info__icon__like {
        mask-image: url('./../assets/icon/icon_like_tweet_info.svg');
        -webkit-mask-image: url('./../assets/icon/icon_like_tweet_info.svg');
        &:hover {
          background: $orange;
        }
      }
    }
  }
</style>
