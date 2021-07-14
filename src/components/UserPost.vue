<template>
  <div class="post__container">
    <!-- 切換選單 -->
    <router-link :to="{name:'detail-tweet', params:{id: post.TweetId}}">
      <div class="post">
        <div class=" post__avatar">
          <img
            class="avatar-img"
            :src="post.User.avatar"
            alt=""
          >
        </div>
        <div class="post__content">
          <div class="post__content__title mb-2">
            <span class="post__content__title__item user-name">
              {{ post.User.name }}
            </span>
            <span class="post__content__title__item">@{{ post.User.account }}</span>
            <span class="post__content__title__item">·</span>
            <span class="post__content__title__item post__content__title__item__time">
              {{ post.createdAt }}
            </span>
          </div>
          <div class="post__content__discription">
            {{ post.description }}
          </div>

          <div class="post__content__reaction d-flex ">
            <router-link :to="{name:'main-reply-post-modal', params:{id:post.TweetId}}">
              <div
                class="post__content__reaction__item message "
                @click="showModal = true"
              >
                <div class="post__content__reaction__item__message " />
                <span class="post__content__reaction__item__text">{{ post.replyCount }}</span>
              </div>
            </router-link>
            <div class="post__content__reaction__item heart">
              <div
                v-if="!post.isLike"
                class="post__content__reaction__item__heart"
                @click="addLiked(post.TweetId)"
              />
              <div
                v-else
                class="post__content__reaction__item__heart--liked"
                @click="removeLiked(post.TweetId)"
              />

              <span
                class="post__content__reaction__item__text"
                :class="{liked:post.isLike}"
              >{{ likeCount }}</span>
            </div>
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
    </router-link>
  </div>
</template>
<script>
import { Toast } from '../utils/helper'
import ReplyPostModal from './../components/ReplyPostModal.vue'
import userAPI from './../apis/users'
export default {
  components: {
    ReplyPostModal
  },
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
    // likeNum: {
    //   type: [Number, String],
    //   required: true
    // }
  },
  data () {
    return {
      showModal: false,
      post: this.initialTweet,
      likeCount: this.initialTweet.likeCount,
      currentUser: {
        name: 'JoJo',
        account: 'jojo',
        id: 10
      }
    }
  },
  watch: {
    initialTweet (newValue) {
      this.post = [
        ...this.post,
        ...newValue
      ]
      console.log('UserPost的newValue:', newValue)
    }
  },
  methods: {
    handleAfterSubmit () {
      this.post.replyCount = this.post.replyCount + 1
    },
    async addLiked (tweetId) {
      try {
        const { data } = await userAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log(data)
        // 還差取得currentUser的api判斷
        if (this.post.TweetId === tweetId) {
          this.post = {
            ...this.post,
            isLike: true
          }
        }
        this.likeCount += 1
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

        // 還差取得currentUser的api判斷
        if (this.post.TweetId === tweetId) {
          this.post = {
            ...this.post,
            isLike: false
          }
        }
        this.likeCount -= 1
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
a{
  text-decoration: none;
  cursor: pointer;
  color: $tx-gray;
}
.liked{
  color: $heart-pink;
  }
.post__container{
  width: 600px;
}
.post__item__wrapper {
  display: flex;
  width: 390px;
  justify-content: space-around;
  text-decoration: none;
  .post__item {
    text-decoration: none;
    width: 130px;
    text-align: center;
    &:hover {
      border-bottom: 1px solid $orange;
    }
    .post__item__button {
      color: $tx-gray;
      text-decoration: none;
      padding: 16px 0 16px 0;
      font-weight: 700;
      &:hover {
        color: $orange;
      }
    }
  }
}

.post {
  display: grid;
  grid-template-columns: 50px 1fr;
  max-width: 600px;
  border-bottom: solid 1px $light-gray;
  border-top: 1px solid $light-gray;
  margin-bottom: -1px;
  padding: 15px;
  &.noborder{
    border: 0px;
  }
  &__content {
    margin-left: 10px;
    &__title {
      color: $tx-gray;
      &__item {
        cursor: pointer;
        &:nth-child(2){
          margin-right: 3px;
        }
        &__time {
          font-size: 14px;
          margin-left: -1px;
        }
      }
    }
    &__discription {
      line-height: 20px;
      @include text-style(15px, normal, $black);
    }
    &__reaction {
      color: $tx-gray;
      margin-top: 14px;
      height: 20px;
      display: flex;
      align-items: center;
      z-index: 10;
      .message:hover {
          color: $light-blue;
          div{
            background: $light-blue;
          }
        }
        .heart:hover{
          color: $heart-pink;
          div{
            background: $heart-pink;
          }
        }
      &__item {
        cursor: pointer;
        margin-right: 50px;
        display: flex;
        align-items: center;
        width: 47px;

        &__text {
          font-size: 13px;
          line-height: 13px;
          margin-left: 12px;
          line-height: 20px;
        }
        &__message,&__heart, &__heart--liked{
          width: 13px;
          height: 13px;
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
  }
}
</style>
