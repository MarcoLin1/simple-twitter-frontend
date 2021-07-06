<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
    >
      <div class="post__avator" />
      <div class="post__content ml-2">
        <div class="post__content__title mb-2">
          <span
            class="post__content__title__item user-name"
          >
            Apple
          </span>
          <span class="post__content__title__item">@apple</span>
          <span class="post__content__title__item">·</span>
          <span class="post__content__title__item">3 小時</span>
        </div>
        <div class="post__content__discription">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
        <div class="post__content__reaction d-flex ">
          <div class="post__content__reaction__item">
            <div class="post__content__reaction__item__message" />
            <span class="post__content__reaction__item__text">13</span>
          </div>
          <div class="post__content__reaction__item">
            <div
              v-if="!post.isLiked"
              class="post__content__reaction__item__heart"
            />
            <div
              v-else
              class="post__content__reaction__item__heart--liked"
            />
            <span
              class="post__content__reaction__item__text"
              :class="{liked:post.isLiked}"
            >76</span>
          </div>
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
  border: solid 1px $light-gray;
  padding: 15px;
  &__avator {
    border-radius: 50%;
    background-color: $img-light-gray;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  &__content {
    cursor: pointer;

    &__title {
      color: $tx-gray;
      &__item {
        margin-right: 4px;
      }
    }
    &__discription {
      line-height: 20px;
      font-size: 15px;
      color: $black;
      cursor: default;
    }
    &__reaction {
      color: $tx-gray;
      margin-top: 14px;
      cursor: pointer;
      img {
        width: 12px;
        height: 12px;
      }
      &__item {
        margin-right: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        &__text {
          font-size: 13px;
          margin-left: 12px;

        }
        &__message,&__heart, &__heart--liked{
          width: 12px;
          height: 12px;
          background-size: contain;
          background-repeat:no-repeat;
        }
        &__message{
          background-image: url(https://i.imgur.com/mcPjxeq.png);
        }

        &__heart{
          background-image: url(https://i.imgur.com/Z6XfVZS.png);
          &--liked{
            width: 20px;
            height: 20px;
            background-image: url(https://i.imgur.com/0zsm3kW.png);
          }
        }

      }
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      posts: [
        {
          id: '1',
          isLiked: true

        },
        {
          id: '2',
          isLiked: false

        },
        {
          id: '3',
          isLiked: true
        }
      ]
    }
  }
}
</script>
