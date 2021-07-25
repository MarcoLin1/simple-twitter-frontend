<template>
  <div class="notifications__container">
    <!-- <div class="notifications__content">
      即將上線
    </div> -->
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notifications__wrapper"
    >
      <div class="notifications__avatar__wrapper">
        <img
          :src="notification.avatar"
          alt=""
          class="notifications__avatar"
        >
      </div>
      <div class="notifications__title">
        {{ notification.title }}
      </div>
      <div class="notifications__text">
        {{ notification.description }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.notifications__content{
  margin: 50px 0;
  @include text-style(20px, 600, $orange);
  text-align: center;
  width: 600px;
}
.notifications__container {
  .notifications__wrapper {
    padding: 10px 0 10px 10px;
    border-top: 1px solid $line-gray;
    .notifications__avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .notifications__title {
      margin: 10px auto 10px auto;
      font-weight: 500;
      font-size: 0.9rem;
    }
    .notifications__text {
      line-height: 1.3rem;
      font-size: 0.8rem;
      color: $tx-gray;
    }
  }
}
</style>

<script>
export default {
  name: 'Notifications',
  components: {
  },
  data () {
    return {
      notifications: [
        {
          id: 1,
          avatar: 'https://www.holoface.photos/static/images/products/figurephotohalf01.jpg',
          title: 'John 有新的推文通知',
          description: 'There are a few things that make this Cigital landing page work. It has simple and relevant imagery. The headline is straightforward and the description of the ebook informs viewers of the specific value they will get by downloading it.'
        },
        {
          id: 2,
          avatar: 'https://www.holoface.photos/static/images/products/figurephotohalf01.jpg',
          title: 'Mary 有新的回覆',
          description: 'There are a few things that make this Cigital landing page work. It has simple and relevant imagery. The headline is straightforward and the description of the ebook informs viewers of the specific value they will get by downloading it.'
        },
        {
          id: 3,
          avatar: 'https://www.holoface.photos/static/images/products/figurephotohalf01.jpg',
          title: 'Apple開始追蹤你',
          description: ''
        },
        {
          id: 4,
          avatar: 'https://www.holoface.photos/static/images/products/figurephotohalf01.jpg',
          title: '你的推文有新的回覆',
          description: 'There are a few things that make this Cigital landing page work. It has simple and relevant imagery. The headline is straightforward and the description of the ebook informs viewers of the specific value they will get by downloading it.'
        }
      ]
    }
  }
}
</script>
