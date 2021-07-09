<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
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
export default {

  data () {
    return {
      posts: [
        {
          id: '1',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
          createdTime: '3 小時',
          isLiked: true
        }
      ]
    }
  },
  created () {
    console.log(this.border)
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
