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
    >
      <div class=" post__avatar">
        <div class="avatar-img" />
      </div>
      <div class="post-content">
        <div class="post-title mb-2">
          <span class="post-title-item user-name">
            {{ chat.name }}
          </span>
          <span class="post-title-item post-title-item-account">{{ chat.account }}</span>
          <span class="post-title-item post-title-item-time">
            {{ chat.createdTime | shortenTime }}
          </span>
        </div>
        <div class="post-discription">
          {{ chat.discription }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.chat_container{
  min-height: 100vh;
  width: 400px;
  &__title{
    height: 55px;
    line-height: 55px;
    @include text-style(18px, 700, $black);
    padding: 0  15px;
    border-bottom: 1px solid $light-gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .plus{
        position: absolute;
        top: 14px;
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
const dummyData = [
  {
    id: '1',
    account: '@apple',
    name: 'Apple',
    discription: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
    createdTime: '2021-05-01 00:00:00',
    isLiked: true
  },
  {
    id: '2',
    account: '@apple',
    name: 'Apple',
    discription: 'Nulla Lorem mollit cupidatatirure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
    createdTime: '2021-06-02 00:00:00',
    isLiked: false
  },
  {
    id: '3',
    account: '@apple',
    name: 'Apple',
    discription: 'Nulla Lorem mollit cupidatatirure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
    createdTime: '2021-07-17 21:00:00',
    isLiked: true
  }

]
export default {
  name: 'OnlineUser',
  mixins: [shortenTimeFilter],
  // props: {
  //   initialUsers: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    return {
      chats: dummyData
    }
  }
  // watch: {
  //   initialUsers (newValue) {
  //     this.users = [
  //       ...this.users,
  //       ...newValue
  //     ]
  //   }
  // }
}
</script>
