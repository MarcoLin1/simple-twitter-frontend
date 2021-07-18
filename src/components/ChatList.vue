<template>
  <div class="chat_container">
    <div
      class="chat_container__title"
    >
      訊息
      <div class="icon-image" />
      <div class="plus">
        +
      </div>
    </div>

    <div
      v-for="chat in chats"
      :key="chat.id"
      class="post"
      @click.stop.prevent="enterRoom(chat.id)"
    >
      <div class=" post__avatar">
        <img
          class="avatar-img"
          :src="chat.avatar | emptyImage"
          alt=""
        >
      </div>
      <div class="post-content">
        <div class="post-title mb-2">
          <span class="post-title-item user-name">
            {{ chat.name }}
          </span>
          <span class="post-title-item post-title-item-account">{{ chat.account }}</span>
          <span class="post-title-item post-title-item-time">
            {{ chat.createdAt | shortenTime }}
          </span>
        </div>
        <div class="post-discription">
          {{ chat.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.chat_container{
  min-height: 100vh;
  &__title{
    height: 45px;
    line-height: 45px;
    @include text-style(18px, 700, $black);
    padding: 0  15px;
    border-bottom: 1px solid $light-gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .plus{
        position: absolute;
        top: 9px;
        right: 16px;
        font-size: 1px;
        width: 10px;
        height: 10px;
        color: black;
        background-color: white;
        line-height: 8px;
        border-radius: 50%;
        text-align: center;
        border: 1px solid white;

      }
    .icon-image{
      width: 30px;
      height: 30px;
      mask-image: url('./../assets/icon/icon_email.svg');
      -webkit-mask-image: url('./../assets/icon/icon_email.svg');
      cursor: pointer;
      @extend %icon-style;

    }
  }
  .post{
    cursor: pointer;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .post-discription{
    color: $tx-gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
  }
  .post-title{
    position: relative;
  }
  .post-title-item-time{
    position: absolute;
    right: 0;
  }
}
</style>
<script>
import { shortenTimeFilter } from './../utils/mixins'

export default {
  name: 'OnlineUser',
  mixins: [shortenTimeFilter],
  props: {
    initialChats: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chats: []
    }
  },
  watch: {
    initialChats (newValue, oldValue) {
      this.chats = [
        ...this.chats,
        ...newValue
      ]
    }
  },
  methods: {
    enterRoom (id) {
      const data = this.chats.filter((chat) => chat.id === id)

      this.$emit('after-enter', data[0])
    }
  }
}
</script>
