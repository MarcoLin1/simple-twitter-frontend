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
      <div
        v-if="notification.labelName === 'tweet'"
        class="notifications__title"
      >
        {{ notification.name + '有新的推文通知' }}
      </div>
      <div
        v-if="notification.labelName === 'follow'"
        class="notifications__title"
      >
        {{ notification.name + '開始追蹤你' }}
      </div>
      <div
        v-if="notification.labelName === 'reply'"
        class="notifications__title"
      >
        {{ notification.name + '有新的回覆' }}
      </div>
      <div
        v-if="notification.labelName === 'like'"
        class="notifications__title"
      >
        {{ notification.name + '喜歡你的貼文' }}
      </div>
      <div class="notifications__text">
        {{ notification.content }}
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
import subscribeAPI from './../apis/subscribe'
import { mapState } from 'vuex'
export default {
  name: 'Notifications',
  components: {
  },
  data () {
    return {
      notifications: []
    }
  },
  computed: {
    ...mapState(['currentUser', 'subscribeNotifyData'])
  },
  watch: {
    subscribeNotifyData: {
      handler: function (newValue, oldValue) {
        this.notifications.push(newValue)
        console.log('這是notify的newValue', newValue)
        console.log('這是notify的this.notifications', this.notifications)
      },
      deep: true
    }
  },
  created () {
    this.getHistoryNotifications()
  },
  methods: {
    async getHistoryNotifications () {
      try {
        const { data } = await subscribeAPI.history({ id: this.currentUser.id })
        this.notifications = data
        console.log('這是歷史通知紀錄', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
