<template>
  <div class="tweet__form__container">
    <form class="tweet__form__wrapper">
      <div class="tweet__form__image__wrapper">
        <div
          src=""
          alt=""
          class="tweet__form__image"
        />
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
        <button
          type="submit"
          class="tweet__form__button"
          @click.stop.prevent="handleSubmit"
        >
          推文
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from '../utils/helper'
export default {
  data () {
    return {
      description: '',
      currentUser: {
        name: 'Apple',
        account: 'apple',
        avator: 'https://i.imgur.com/27eBUkt.jpg'
      }
    }
  },
  methods: {
    handleSubmit () {
      if (!this.description) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文內容'
        })
        return
      }
      this.$emit('after-submit', this.description)
      this.description = ''
      console.log('handleSubmit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .tweet__form__wrapper {
    width: 600px;
    height: auto;
    margin: 0 auto;
    border-top: 1px solid $light-gray;
    border-bottom: 10px solid $light-gray;
    padding: 10px 15px 10px 15px;
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
    text-align: end;
    .tweet__form__button {
      width: 64px;
      height: 40px;
      border: none;
      border-radius: 100px;
      background: $orange;
      color: #ffffff;
    }
  }
</style>
