<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
      :class="{ noborder: noborder }"
    >
      <div class=" post__avatar">
        <div class="avatar-img" />
      </div>
      <div class="post__content">
        <div class="post__content__title mb-2">
          <span class="post__content__title__item user-name">
            {{ post.name }}
          </span>
          <span class="post__content__title__item">{{ post.account }}</span>
          <span class="post__content__title__item">·</span>
          <span class="post__content__title__item post__content__title__item__time">
            {{ post.createdTime }}
          </span>
        </div>
        <div class="post__content__discription">
          {{ post.discription }}
        </div>
        <div
          v-if="!noreaction"
          class="post__content__reaction d-flex "
        >
          <div
            class="post__content__reaction__item"
            data-toggle="modal"
            data-target="#reply__post__modal"
          >
            <div class="post__content__reaction__item__message " />
            <span class="post__content__reaction__item__text">13</span>
          </div>
          <div class="post__content__reaction__item">
            <div
              v-if="!post.isLiked"
              class="post__content__reaction__item__heart"
              @click="addLiked(post.id)"
            />
            <div
              v-else
              class="post__content__reaction__item__heart--liked"
              @click="removeLiked(post.id)"
            />

            <span
              class="post__content__reaction__item__text"
              :class="{liked:post.isLiked}"
            >76</span>
          </div>
        </div>
        <template>
          <ReplyPostModal />
        </template>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.liked{
  color: $heart-pink;
  }
.post {
  display: grid;
  grid-template-columns: 50px 1fr;
  max-width: 600px;
  border: solid 1px $light-gray;
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
      &__item {
        cursor: pointer;
        margin-right: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 47px;
        &:first-child:hover{
          color: $light-blue;
          div{
            background: $light-blue;
          }
        }
        &:last-child:hover{
          color: $heart-pink;
          div{
            background: $heart-pink;
          }
        }
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

<script>
import ReplyPostModal from './../components/ReplyPostModal.vue'
export default {
  components: {
    ReplyPostModal
  },
  props: {

  },
  data () {
    return {
      posts: ''
    }
  },
  methods: {
    addLiked (id) {
      this.posts.filter((post) => {
        if (post.id === id) {
          post.isLiked = true
        }
      })
    },
    removeLiked (id) {
      this.posts.filter((post) => {
        if (post.id === id) {
          post.isLiked = false
        }
      })
    }
  }
}
</script>
