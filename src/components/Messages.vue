<template>
  <div>
    <div
      v-for="reply in replies"
      :key="reply.id"
      class="reply"
    >
      <div class="reply__avatar ">
        <img
          :src="reply.user.avatar"
          alt=""
          class="avatar-img"
        >
      </div>
      <div class="reply__content ml-2">
        <div class="reply__content__title mb-2">
          <span class="reply__content__title__item user-name">
            {{ reply.user.name }}
          </span>
          <span class="reply__content__title__item">@{{ reply.user.account }}</span>
          <span class="reply__content__title__item">·</span>
          <span
            class="reply__content__title__item reply__content__title__item__time"
          >
            {{ reply.createdAt|fromNow }}
          </span>
        </div>
        <div class="reply__content__object">
          <span>回覆</span>
          <span>@apple</span>
        </div>
        <div class="reply__content__discription">
          {{ reply.comment }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.liked {
  color: $heart-pink;
}

.reply {
  display: grid;
  grid-template-columns: 50px 1fr;
  width: 600px;
  border: solid 1px $light-gray;
  padding: 15px;
  margin-top: -1px;
  &__content {
    &__title {
      color: $tx-gray;
      &__item {
        cursor: pointer;
        &:nth-child(2) {
          margin-right: 3px;
        }
        &__time {
          // font-size: 14px;
          margin-left: -1px;
        }
      }
    }
    &__discription {
      line-height: 21px;
      @include text-style(15px, 400, $black);
    }
    &__object{
      line-height: 21px;
      margin: 5px 0;
      span:nth-child(2){
        color: $orange;
        margin-left: 4px;
      }
    }
  }
}
</style>

<script>
import { fromNowFilter } from './../utils/mixins'
const dummyData = {
  replies: [
    {
      createdAt: '2021-07-3T16:24:55.443Z',
      ReplyId: 1,
      comment: 'Good Job!',
      user: {
        UserId: 1,
        name: 'Mary Jane',
        account: 'mjjane',
        avatar: 'https://i.imgur.com/ZE7I56u.png'
      }
    },
    {
      createdAt: '2021-05-30T16:24:55.443Z',
      ReplyId: 2,
      comment: 'Great~',
      user: {
        UserId: 1,
        name: 'apple',
        account: 'apple',
        avatar: 'https://loremflickr.com/320/240/people?random'
      }
    },
    {
      createdAt: '2021-03-30T16:24:55.443Z',
      ReplyId: 3,
      comment: 'Good Job!',
      user: {
        UserId: 1,
        name: 'apple',
        account: 'apple',
        avatar: 'https://i.imgur.com/27eBUkt.jpg'
      }
    },
    {
      createdAt: '2021-03-30T16:24:55.443Z',
      ReplyId: 4,
      comment: 'Good Job!',
      user: {
        UserId: 1,
        name: 'apple',
        account: 'apple',
        avatar: 'https://i.imgur.com/27eBUkt.jpg'
      }
    },{
      createdAt: '2021-03-30T16:24:55.443Z',
      ReplyId: 5,
      comment: 'Good Job!',
      user: {
        UserId: 1,
        name: 'apple',
        account: 'apple',
        avatar: 'https://i.imgur.com/27eBUkt.jpg'
      }
    }
  ]
}

export default {
  mixins: [fromNowFilter],
  data () {
    return {
      repliedAccount: 'apple',
      replies: []
    }
  },
  created () {
    this.fetchReplies()
  },
  methods: {
    fetchReplies () {
      this.replies = dummyData.replies
    }
  }
}
</script>
