<template>
  <div class="post__item__container">
    <div class="post__itwm__wrapper">
      <div class="post__item">
        <!-- 記得改網址 -->
        <router-link
          :to="{name: 'user-tweets', params:{id: id}}"
          type="button"
          class="post__item__button"
          :class="{checked:$route.path.includes('tweets')}"
        >
          推文
        </router-link>
      </div>
      <div class="post__item">
        <!-- 記得改網址 -->
        <router-link
          :to="{name: 'user-replies', params:{id: id}}"
          type="button"
          class="post__item__button"
          :class="{checked:$route.path.includes('replies')}"
        >
          推文回覆
        </router-link>
      </div>
      <div class="post__item ">
        <!-- 記得改網址 -->
        <router-link
          :to="{name: 'user-likes', params:{id: id}}"
          type="button"
          class="post__item__button "
          :class="{checked:$route.path.includes('likes')}"
        >
          喜歡的內容
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.liked{
  color: $heart-pink;
  }
.post__item__container{
  width: 600px;
  border-bottom: 1px solid $light-gray;
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
    .post__item__button {
      color: $tx-gray;
      text-decoration: none;
      padding: 16px 0 16px 0;
      font-weight: 700;
      width: 120px;
      &:hover {
        color: $orange;
        border-bottom: 1px solid $orange;
      }
      &:focus {
        border-bottom: 1px solid $orange;
        color: $orange;
      }
      &.checked {
        border-bottom: 1px solid $orange;
        color: $orange;
      }
    }
  }
}

</style>

<script>

export default {
  props: {
    userId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      id: this.userId
    }
  }
}
</script>
