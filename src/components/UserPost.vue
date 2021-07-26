<template>
  <div class="post__container">
    <!-- 切換選單 -->
    <div class="post">
      <router-link :to="{name:'user-tweets', params:{id: post.User.id}}">
        <div class=" post__avatar">
          <img
            class="avatar-img"
            :src="post.User.avatar | emptyImage"
            alt=""
          >
        </div>
      </router-link>
      <router-link :to="{name:'detail-tweet', params:{id: post.TweetId}}">
        <div class="post__content">
          <div class="post__content__title mb-2">
            <span class="post__content__title__item user-name">
              {{ post.User.name }}
            </span>
            <span class="post__content__title__item">@{{ post.User.account }}</span>
            <span class="post__content__title__item">·</span>
            <span class="post__content__title__item post__content__title__item__time">
              {{ post.createdAt | fromNow }}
            </span>
          </div>
          <div class="post__content__discription">
            {{ post.description }}
          </div>
        </div>
      </router-link>
      <div class="post__reaction d-flex ">
        <div
          class="post__reaction__item message "
          @click="showModal = true"
        >
          <div class="post__reaction__item__message " />
          <span class="post__reaction__item__text">{{ post.replyCount }}</span>
        </div>
        <div class="post__reaction__item ">
          <div
            v-if="!post.isLike"
            class="post__reaction__item__container heart"
            @click="addLiked(post.TweetId)"
          >
            <div
              class="post__reaction__item__heart"
            />
            <span
              class="post__reaction__item__text"
              :class="{liked:post.isLike}"
            >{{ post.likeCount }}</span>
          </div>
          <div
            v-else
            class="post__reaction__item__container"
            @click="removeLiked(post.TweetId)"
          >
            <div
              class="post__reaction__item__heart--liked"
            />

            <span
              class="post__reaction__item__text"
              :class="{liked:post.isLike}"
            >{{ post.likeCount }}</span>
          </div>
        </div>
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
</template>
<script>
import { Toast } from '../utils/helper'
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'
import ReplyPostModal from './../components/ReplyPostModal.vue'
import userAPI from './../apis/users'
import { mapState } from 'vuex'

export default {
  name: 'UserPost',
  components: {
    ReplyPostModal
  },
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showModal: false,
      post: this.initialTweet,
      likeCount: this.initialTweet.likeCount
    }
  },
  computed: {
    ...mapState(['currentUser'])

  },
  watch: {
    initialTweet (newValue) {
      this.post = {
        ...this.post,
        ...newValue
      }
    },
    likeCount (newValue) {
      this.likeCount = this.post.likeCount
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
        if (this.post.TweetId === tweetId) {
          this.post = {
            ...this.post,
            isLike: true,
            likeCount: this.post.likeCount + 1
          }
        }
        this.likeCount += 1
        // socket event
        this.$socket.emit('reactionNotify', { id: this.currentUser.id, receiverId: this.post.User.id, avatar: this.post.User.avatar, name: this.post.User.name, labelName: 'like' })
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
        if (this.post.TweetId === tweetId) {
          this.post = {
            ...this.post,
            isLike: false,
            likeCount: this.post.likeCount - 1
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
  grid-row-gap: 12px;
  max-width: 600px;
  border-bottom: 1px solid $light-gray;
  margin-top: -1px;
  padding: 15px;
  &.noborder{
    border: 0px;
  }
  &__content {
    margin-left: 10px;
    cursor: pointer;
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
      width: 100%;
      word-break: break-all;
      @include text-style(15px, normal, $black,pointer);
    }

  }
  &__reaction {
      grid-column: 2/3;
      grid-row: 2/3;
      margin-left: 10px;
      color: $tx-gray;
      height: 20px;
      display: flex;
      align-items: center;
      .heart{
        position: relative;
        &::before{
          position: absolute;
          top: -1px;
          left: -2px;
          content: '';
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background:  $heart-pink;
          opacity: 0;
        }
      }
      .message{
        position: relative;
        &::before{
          position: absolute;
          top: -1px;
          left: -2px;
          content: '';
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background:  $light-blue;
          opacity: 0;
        }
      }
      .message:hover {
          color: $light-blue;
          &::before{
          opacity: 0.2;
          transition: opacity 0.2s ease-in ;
        }
          div{
            background: $light-blue;
          }
      }
      .heart:hover{
        color: $heart-pink;
        position: relative;

        &::before{
          opacity: 0.2;
          transition: opacity 0.2s ease-in ;
        }
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
        &__container{
          width: 100%;
          display: flex;
          align-items: center;
        }
        &__text {
          font-size: 14px;
          line-height: 14px;
          margin-left: 12px;
          line-height: 20px;
        }
        &__message,&__heart, &__heart--liked{
          width: 18px;
          height: 18px;
          @extend %icon-style;
        }
        &__message{
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
</style>
