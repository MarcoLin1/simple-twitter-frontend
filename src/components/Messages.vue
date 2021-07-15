<template>
  <div>
    <div class="reply">
      <div class="reply__avatar ">
        <router-link :to="{ name:'user-tweets', params:{id:reply.User.id}}">
          <img
            :src="reply.User.avatar"
            alt=""
            class="avatar-img"
          >
        </router-link>
      </div>
      <div class="reply__content ml-2">
        <div class="reply__content__title mb-2">
          <span class="reply__content__title__item user-name">
            {{ reply.User.name }}
          </span>
          <span class="reply__content__title__item">@{{ reply.User.account }}</span>
          <span class="reply__content__title__item">·</span>
          <span
            class="reply__content__title__item reply__content__title__item__time"
          >
            {{ reply.createdAt|fromNow }}
          </span>
        </div>
        <div class="reply__content__object">
          <span>回覆</span>
          <span>@{{ user.account }}</span>
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
  border-bottom: solid 1px $light-gray;
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
          font-size: 14px;
          margin-left: -1px;
        }
      }
    }
    &__discription {
      line-height: 21px;
      word-break: break-all;
      @include text-style(15px, 400, $black);
    }
    &__object{
      line-height: 21px;
      margin: 5px 0;
      color: $tx-gray;
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
export default {
  mixins: [fromNowFilter],
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    initialReply: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      repliedAccount: 'apple',
      user: this.initialUser,
      reply: this.initialReply
    }
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    },
    initialReply (newValue) {
      this.reply = {
        ...this.reply,
        ...newValue
      }
    }
  },
  methods: {
  }
}
</script>
