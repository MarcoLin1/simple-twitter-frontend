<template>
  <div>
    <div class="post">
      <div class=" post__avatar">
        <img
          class="avatar-img"
          :src="initialTweet.User.avatar"
          alt=""
        >
      </div>
      <div class="post__content">
        <div class="post__content__title mb-2">
          <span class="post__content__title__item user-name">
            {{ initialTweet.User.name }}
          </span>
          <span class="post__content__title__item">{{ initialTweet.User.account }}</span>
          <span class="post__content__title__item">·</span>
          <span class="post__content__title__item post__content__title__item__time">
            {{ initialTweet.createdAt | fromNow }}
          </span>
        </div>
        <div class="post__content__discription">
          {{ initialTweet.description }}
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
.post {
  display: grid;
  grid-template-columns: 50px 1fr;
  max-width: 600px;
  padding: 15px;
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

  }
}
</style>

<script>
import { fromNowFilter } from './../utils/mixins'

export default {
  mixins: [fromNowFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  }
}
</script>
