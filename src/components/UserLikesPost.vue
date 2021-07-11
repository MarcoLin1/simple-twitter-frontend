<template>
  <div class="post__container">
    <div
      class="post"
    >
      <div class="post__avatar">
        <div class="avatar-img" />
      </div>
      <div class="post__content ml-2">
        <div class="post__content__title mb-2">
          <span class="post__content__title__item user-name">
            {{ post.user.name }}
          </span>
          <span class="post__content__title__item">{{ post.account }}</span>
          <span class="post__content__title__item">·</span>
          <span class="post__content__title__item post__content__title__item__time">
            {{ post.Tweet.createdAt }}
          </span>
        </div>
        <div class="post__content__discription">
          {{ post.Tweet.description }}
        </div>
        <div class="post__content__reaction d-flex ">
          <div
            class="post__content__reaction__item "
            data-toggle="modal"
            data-target="#reply__post__modal"
          >
            <div class="post__content__reaction__item__message " />
            <span class="post__content__reaction__item__text">{{ post.Tweet.replyCount }}</span>
          </div>
          <div class="post__content__reaction__item">
            <div
              v-if="!post.Tweet.isLike"
              class="post__content__reaction__item__heart"
              @click="addLiked(post.Tweet.id)"
            />
            <div
              v-else
              class="post__content__reaction__item__heart--liked"
              @click="removeLiked(post.Tweet.id)"
            />
            <span
              class="post__content__reaction__item__text"
              :class="{liked:post.Tweet.isLiked}"
            >{{ post.Tweet.likeCount }}</span>
          </div>
          <template>
            <ReplyPostModal />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.liked{
  color: $heart-pink;
  }
.post__container{
  width: 600px;
}
.post__itwm__wrapper {
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
  border-top: solid 1px $light-gray;
  padding: 15px;
  height: 124px;
  &__content {
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
      &__item {
        cursor: pointer;
        margin-right: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
          &:hover {
            background: $light-blue;
            }
        }

        &__heart{
          mask-image: url('./../assets/icon/icon_like.svg');
          -webkit-mask-image:url('./../assets/icon/icon_like.svg');
          background: $tx-gray;
          &:hover {
            background: $heart-pink;
          }
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

<script>
import ReplyPostModal from './ReplyPostModal.vue'
import userAPI from './../apis/users'
import { Toast } from '../utils/helper'

export default {
  components: {
    ReplyPostModal
  },
  props: {
    initialPost: {
      type: [Object, Array],
      require: true
    }
  },
  data () {
    return {
      post: this.initialPost
    }
  },
  methods: {
    async addLiked (id) {
      try {
        const { data } = await userAPI.addLike({ id })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.post = {
          ...this.post,
          ...this.post.Tweet.isLike = true
        }
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '喜歡貼文失敗，請稍候再試'
        })
      }
    },
    async removeLiked (id) {
      try {
        const { data } = await userAPI.removeLike({ id })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.post = {
          ...this.post,
          ...this.post.Tweet.isLike = false
        }
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
