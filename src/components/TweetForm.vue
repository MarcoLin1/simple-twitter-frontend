<template>
  <div class="tweet__form__container">
    <form class="tweet__form__wrapper">
      <div class="tweet__form__emoji">
        <EmojiPicker @add-emoji="addEmoji" />
      </div>

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
import EmojiPicker from './../components/EmojiPicker.vue'

export default {
  components: { EmojiPicker },
  mixins: [emptyImageFilter],
  data () {
    return {
      description: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    countNum: function () {
      return 140 - this.description.length
    }
  },
  methods: {
    addEmoji (emoji) {
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
    .tweet__form__emoji{
      position: absolute;
      bottom: 3.5rem;
      right: 15px;
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
  @media screen and (max-width: 768px) {
  .tweet__form__wrapper{
    width: 100%;
  }
}
</style>
