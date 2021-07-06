<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
    >
      <div class="post__avator avator-img" />
      <div class="post__content ml-2">
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
        <div class="post__content__reaction d-flex ">
          <div class="post__content__reaction__item">
            <div class="post__content__reaction__item__message" />
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
        &__text {
          font-size: 13px;
          line-height: 13px;
          margin-left: 12px;
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
export default {
  data () {
    return {
      posts: [
        {
          id: '1',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
          createdTime: '3 小時',
          isLiked: true

        },
        {
          id: '2',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatatirure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
          createdTime: '6月25日',
          isLiked: false

        },
        {
          id: '3',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatatirure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
          createdTime: '3 小時',
          isLiked: true
        }
      ]
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
