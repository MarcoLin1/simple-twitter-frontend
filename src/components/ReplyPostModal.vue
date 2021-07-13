<template>
  <form
    action=""
  >
    <div class="new__post__modal__wrapper">
      <div
        id="reply__post__modal"
        class="modal"
        tabindex="-1"
      >
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="$router.go(-1)"
              >
                <span
                  aria-hidden="true"
                >&times;</span>
              </button>
            </div>
            <div class="modal__body">
              <div class="modal__body__wrapper">
                <div class="modal__body__wrapper__post">
                  <PurePost :initial-tweet="tweet" />
                </div>
                <div class="modal__body__wrapper">
                  <div class="modal__body__wrapper__replyto">
                    <span>回覆給 </span>
                    <span class="modal__body__wrapper__account">@apple</span>
                  </div>
                </div>
                <div class="modal__body__wrapper__reply">
                  <img
                    src="https://www.holoface.photos/static/images/products/figurephotohalf01.jpg"
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
  .new__post__modal__wrapper {
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
</style>

<script>
import { Toast } from '../utils/helper'
import PurePost from './../components/PurePost.vue'
import tweetAPI from './../apis/tweets'
export default {
  components: {
    PurePost
  },
  data () {
    return {
      comment: '',
      tweet: {}
    }
  },
  created () {
    const { id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
  },
  methods: {
    async fetchTweet (tweetId) {
      const { data } = await tweetAPI.getATweet({ tweetId })
      this.tweet = data
    },
    async handleSubmit () {
      const { id: tweetId } = this.$route.params
      console.log(tweetId)
      try {
        if (!this.comment) {
          console.log('You can not submit blank value')
        }
        const { data } = await tweetAPI.reply({ tweetId, comment: this.comment })
        console.log(data)
        this.$router.back()
        const replyData = {
          showModal: false,
          comment: this.comment
        }
        this.$emit('after-submit', replyData)
      } catch (error) {
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
