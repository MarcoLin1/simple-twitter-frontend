<template>
  <div class="tweet__form__container">
    <form class="tweet__form__wrapper">
      <emoji-picker
        :search="search"
        @emoji="insert"
      >
        <div
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          class="emoji-invoker"
          @click.stop="clickEvent"
        >
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <button type="button" />
        </div>
        <div
          slot="emoji-picker"
          slot-scope="{ emojis }"
        >
          <div class="emoji-picker">
            <div>
              <div
                v-for="(emojiGroup, category) in emojis"
                :key="category"
              >
                <h5>{{ category }}</h5>
                <div class="emojis">
                  <span
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    :title="emojiName"
                    @click="insert(emoji)"
                  >{{ emoji }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </emoji-picker>
      <div class="tweet__form__image__wrapper">
        <div class="tweet__form__image">
          <img
            class="avatar-img"
            :src="currentUser.avatar | emptyImage"
            alt=""
          >
        </div>
        <textarea
          v-model="description"
          type="text"
          rows="4"
          cols="50"
          maxlength="140"
          class="tweet__form__input"
          placeholder="有什麼新鮮事?"
        />
      </div>

      <div class="tweet__form__button__wrapper">
        <div
          v-show="description"
          class="alert-text"
          :class="{hint:description.length > 130}"
        >
          {{ countNum }}
        </div>
        <button
          type="submit"
          class="tweet__form__button"
          :disabled="isProcessing"
          @click.stop.prevent="handleSubmit"
        >
          {{ isProcessing? '處理中' : '推文' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'

export default {
  components: { EmojiPicker },
  mixins: [emptyImageFilter],
  data () {
    return {
      description: '',
      isProcessing: false,
      search: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    countNum: function () {
      return 140 - this.description.length
    }
  },
  methods: {
    insert (emoji) {
      this.description += emoji
    },
    handleSubmit () {
      this.isProcessing = true
      if (!this.description.trim()) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文內容'
        })
        this.isProcessing = false
        return
      }
      if (this.description.length > 140) {
        Toast.fire({
          icon: 'warning',
          title: '字數請限制於 140 字內'
        })
        this.isProcessing = false
        return
      }

      this.$emit('after-submit', this.description)
      this.description = ''
      this.isProcessing = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

  .tweet__form__wrapper {
    position: relative;
    width: 600px;
    height: auto;
    margin: 0 auto;
    border-top: 1px solid $light-gray;
    border-bottom: 10px solid $light-gray;
    padding: 10px 15px 10px 15px;
    .emoji-invoker {
      position: absolute;
      bottom: 3.5rem;
      right: 15px;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
    }
    .emoji-invoker:hover {
      transform: scale(1.1);
    }
    .emoji-invoker > svg {
      fill: #b1c6d0;
    }

    .emoji-picker {
      position: absolute;
      top: 6rem;
      right: 15px;
      z-index: 1;
      border: 1px solid #ccc;
      width: 15rem;
      height: 20rem;
      overflow: scroll;
      padding: 1rem;
      box-sizing: border-box;
      border-radius: 0.5rem;
      background: #fff;
      box-shadow: 1px 1px 8px #c7dbe6;
    }
    .emoji-picker h5 {
      margin: 10px 0;
      margin-bottom: 0;
      color: #b1b1b1;
      text-transform: uppercase;
      font-size: 0.8rem;
      cursor: default;
    }
    .emoji-picker .emojis {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .emoji-picker .emojis:after {
      content: "";
      flex: auto;
    }
    .emoji-picker .emojis span {
      padding: 0.2rem;
      cursor: pointer;
      border-radius: 5px;
    }
    .emoji-picker .emojis span:hover {
      background: #ececec;
      cursor: pointer;
    }

  }
  .tweet__form__image__wrapper {
    display: flex;
    .tweet__form__image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      background: $img-dark-gray;
    }
    .tweet__form__input {
      border: none;
      color: #9197A3;
      padding: 10px 0 0 10px;
      letter-spacing: 1px;
      line-height: 1.3rem;
      resize: none;
      &:focus-visible {
        width: 75%;
        outline:none;
      }
    }
  }
  .tweet__form__button__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .tweet__form__button {
      width: 64px;
      height: 40px;
      border: none;
      border-radius: 100px;
      background-color: $orange;
      color: #ffffff;
      &:disabled{
        background-color: $disabled-orange;
  }
    }
  }
</style>
