<template>
  <form
    action=""
    class="new__post__modal__form"
    @submit.stop.prevent="handleSubmit"
  >
    <div class="new__post__modal__wrapper">
      <div
        id="new__post__modal"
        class=""
        tabindex="-1"
      >
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <button
                type="button"
                class="close"
              >
                <label
                  class="side-navbar-button toggle__label"
                  for="toggle__control"
                >
                  <span
                    aria-hidden="true"
                  >&times;</span>
                </label>
              </button>
            </div>
            <div class="modal__body">
              <div class="modal__body__wrapper">
                <img
                  :src="currentUser.avatar | emptyImage"
                  alt=""
                  class="modal__body__img"
                >
                <textarea
                  v-model="tweet"
                  rows="8"
                  cols="40"
                  type="text"
                  maxlength="140"
                  placeholder="有什麼新鮮事"
                  class="modal__body__input"
                />
                <div class="modal__body__emoji">
                  <EmojiPicker @add-emoji="addEmoji" />
                </div>
              </div>
            </div>
            <div class="modal__footer">
              <div
                v-show="tweet"
                class="alert-text"
                :class="{hint:tweet.length>130}"
              >
                {{ countNum }}
              </div>
              <label
                class="side-navbar-button toggle__label"
              >
                <div
                  class="toggle__text"
                />
                <button
                  type="submit"
                  class="modal__footer__button"
                  :disabled="isProcessing"
                >
                  {{ isProcessing? '處理中':'推文' }}
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .new__post__modal__form {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.33);

  }
  .new__post__modal__wrapper {
    .modal__dialog {
      margin: 3rem auto;
      .modal__content {
        width: 90%;
        height: 100%;
        max-width: 600px;
        max-height: 300px;
        margin: auto;
        background: #ffffff;
        border-radius: 14px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.33);
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
      margin: 19px 0 0 19px;
      position: relative;
      .modal__body__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .modal__body__emoji{
        position: absolute;
        bottom: 1rem;
        right: 15px;
      }
    }
    .modal__body__input {
      position: relative;
      border: none;
      margin-left: 10px;
      color: #9197A3;
      resize: none;
      padding: 10px 0 0 10px;
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
      align-items: center;
      margin-right: 15px;
      padding-bottom: 15px;
      .modal__footer__button {
        border-radius: 100px;
        background-color: $orange;
        border: none;
        width: 64px;
        height: 40px;
        cursor: pointer;
        color: #ffffff;
        &:disabled{
          background-color: $disabled-orange;
        }

      }
    }
  }
  .toggle__label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    .toggle__text {
      position: relative;
      right: -46px;
      color: #ffffff;

    }
  }
</style>

<script>
import { mapState } from 'vuex'
import { Toast } from '../utils/helper'
import tweetAPI from './../apis/tweets'
import { emptyImageFilter } from './../utils/mixins'
import EmojiPicker from './../components/EmojiPicker.vue'

export default {
  components: { EmojiPicker },
  mixins: [emptyImageFilter],
  data () {
    return {
      isProcessing: false,
      tweet: ''
    }
  },
  computed: {
    ...mapState(['currentUser']),
    countNum: function () {
      return 140 - this.tweet.length
    }
  },
  methods: {
    addEmoji (emoji) {
      this.tweet += emoji
    },
    async handleSubmit () {
      try {
        this.isProcessing = true
        if (!this.tweet.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入推文內容'
          })
          this.isProcessing = false
          return
        }
        if (this.tweet.length > 140) {
          Toast.fire({
            icon: 'warning',
            title: '字數請限制於 140 字內'
          })
          this.isProcessing = false
          return
        }

        const { data } = await tweetAPI.create({ description: this.tweet })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 傳送sockets發文事件
        this.$socket.emit('subscribeNotify', {
          id: this.currentUser.id,
          content: this.tweet,
          avatar: this.currentUser.avatar,
          name: this.currentUser.name,
          labelName: 'tweet'
        })

        const toggleControl = document.querySelector('.toggle__control')
        toggleControl.checked = false
        this.$emit('after-side-submit', { tweet: this.tweet, id: data.id })
        this.tweet = ''
        this.$router.push({ name: 'main-page' })
        this.isProcessing = false
      } catch (e) {
        console.log(e)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '新增貼文失敗'
        })
      }
    }
  }
}
</script>
