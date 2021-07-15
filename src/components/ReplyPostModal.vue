<template>
  <form
    action=""
  >
    <div class="reply__modal__mask">
      <div
        id="reply__modal__wrapper"
        class="reply__modal__wrapper"
        tabindex="-1"
      >
        <div class="reply__modal__container">
          <div class="modal__content">
            <div class="modal__header">
              <button
                type="button"
                @click="$emit('close')&$router.go(-1)"
              >
                <span
                  aria-hidden="true"
                >&times;</span>
              </button>
            </div>
            <div class="modal__body">
              <div class="modal__body__wrapper">
                <div class="modal__body__wrapper__post">
                  <!-- tweet area -->
                  <div class="post">
                    <div class=" post__avatar">
                      <img
                        class="avatar-img"
                        :src="tweet.User.avatar | emptyImage"
                        alt=""
                      >
                    </div>
                    <div class="post__content">
                      <div class="post__content__title mb-2">
                        <span class="post__content__title__item user-name">
                          {{ tweet.User.name }}
                        </span>
                        <span class="post__content__title__item">{{ tweet.User.account }}</span>
                        <span class="post__content__title__item">·</span>
                        <span class="post__content__title__item post__content__title__item__time">
                          {{ tweet.createdAt }}
                        </span>
                      </div>
                      <div class="post__content__discription">
                        {{ tweet.description }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal__body__wrapper">
                  <div class="modal__body__wrapper__replyto">
                    <span>回覆給 </span>
                    <span class="modal__body__wrapper__account">@{{ tweet.User.name }}</span>
                  </div>
                </div>
                <div class="modal__body__wrapper__reply">
                  <img
                    :src="currentUser.avatar | emptyImage"
                    alt=""
                    class="modal__body__img"
                  >
                  <textarea
                    v-model="comment"
                    rows="8"
                    cols="40"
                    type="text"
                    maxlength="140"
                    placeholder="有什麼新鮮事"
                    class="modal__body__input"
                  />
                </div>
              </div>
            </div>
            <div class="modal__footer">
              <button
                type="submit"
                class="modal__footer__button"
                :disabled="isProcessing"
                @click.stop.prevent="handleSubmit"
              >
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .reply__modal{
    &__mask{
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s ease;

    }
    &__wrapper{
      vertical-align: middle;
    }
    &__container{
      width: 600px;
      min-height: 450px;
      border-radius: 14px;
      background-color: #fff;
      margin: auto;
      margin-top: 50px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
    }

  }

  .reply__modal__wrapper {
    .modal__dialog {
      margin: 3rem auto;
      .modal__content {
        width: 100%;
        height: 100%;
        max-width: 600px;
        min-height: 450px;
        margin: auto;
        background: #ffffff;
        border-radius: 14px;
      }
    }
    .modal__header {
      display: flex;
      border-bottom: 1px solid $light-gray;
      padding: 19px;
      .close {
        margin: 0;
        padding: 0;
        text-shadow: none;
        opacity: 1;
        color: $orange;
      }
    }
    .modal__body__wrapper {
      display: flex;
      display: flex;
      flex-direction: column;
      .modal__body__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .modal__body__wrapper__post{
         position: relative;
        &::before{
          position: absolute;
          content: '';
          width: 2px;
          height: 60%;
          background-color: $line-gray;
          top:calc(15px + 50px + 10px);
          left: 40px;
        }
      }
      .modal__body__wrapper__replyto{
        margin-left: 75px;

        span{
          @include text-style(13px, 500, $tx-gray);
          &:last-child{
            color: $orange;
          }
        }

      }

      .modal__body__wrapper__reply{
        display: flex;
        margin-top: 23px;
        padding: 15px;
      }
    }
    .modal__body__input {
      border: none;
      margin-left: 10px;
      color: #9197A3;
      resize: none;
      padding: 10px 0 0 0;
      letter-spacing: 1px;
      line-height: 1.3rem;
       &:focus-visible {
        outline: none;
      }
    }
    .modal__footer {
      border: none;
      display: flex;
      justify-content: flex-end;
      margin-right: 15px;
      padding-bottom: 15px;
      .modal__footer__button {
        border-radius: 100px;
        background: $orange;
        border: none;
        width: 64px;
        height: 40px;
        cursor: pointer;
        color: #ffffff;
      }
    }
  }
  .liked{
  color: $heart-pink;
  }
.post {
  display: grid;
  grid-template-columns: 50px 1fr;
  max-width: 600px;
  padding: 15px;
  .avatar-img{
    cursor: default;
  }
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
import { mapState } from 'vuex'
import { Toast } from '../utils/helper'
import { emptyImageFilter } from './../utils/mixins'
import tweetAPI from './../apis/tweets'
export default {
  name: 'ReplyPostModal',
  components: { },
  mixins: [emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isProcessing: false,
      tweet: this.initialTweet,
      comment: ''

    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async handleSubmit () {
      try {
        this.isProcessing = true
        if (!this.comment.trim()) {
          this.isProcessing = false
          console.log('You can not submit blank value')
          Toast.fire({
            icon: 'warning',
            title: '請輸入回覆內容'
          })
          return
        }
        const tweetId = this.initialTweet.id ? this.initialTweet.id : this.initialTweet.TweetId
        const { data } = await tweetAPI.reply({ tweetId, comment: this.comment })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        const replyData = {
          comment: this.comment.trim()
        }
        this.comment = ''
        this.$router.back()
        this.$emit('close')
        this.$emit('after-submit', replyData)
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法新增留言，請稍後再試'
        })
      }
    }
  }
}
</script>
