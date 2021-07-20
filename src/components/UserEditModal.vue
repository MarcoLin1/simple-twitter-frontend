<template>
  <div
    id="user__edit__modal__container"
    class="user__edit__modal__container"
    role="dialog"
    aria-labelledby="user__edit__modal"
  >
    <Spinner v-if="isLoading" />
    <template v-else>
      <form
        class="modal__dialog modal__content"
        @submit.stop.prevent="handleSubmit"
      >
        <div class="user__edit__modal__header">
          <div class="user__edit__modal__header__wrapper">
            <label
              for="user__edit__modal"
              class="user__edit__modal__label"
            >
              <div
                class="user__edit__modal__close close"
              >
                <span>&times;</span>
              </div>
            </label>
            <div class="user__edit__modal__title">
              編輯個人資料
            </div>
          </div>
          <div class="user__edit__modal__button__wrapper">
            <button
              type="submit"
              class="user__edit__modal__button"
            >
              儲存
            </button>
          </div>
        </div>
        <div class="user__edit__modal__cover__wrapper">
          <img
            :src="user.cover | emptyCover"
            class="user__edit__modal__cover cover-img"
            alt=""
          >
          <input
            id="user__edit__modal__cover__file image"
            accept="image/*"
            name="cover"
            type="file"
            class="user__edit__modal__icon user__edit__modal__cover__photo"
            @change="handleCoverChange"
          >
          <label
            for="user__edit__modal"
            class="user__edit__modal__label"
          >
            <div
              class="user__edit__modal__cover__close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                aria-hidden="true"
                data-bs-dismiss="modal"
              >&times;</span>
            </div>
          </label>
          <div class="user__edit__modal__icon user__edit__modal__cover__delete" />
        </div>
        <div class="user__edit__modal__avatar__wrapper">
          <img
            :src="user.avatar | emptyImage"
            class="user__edit__modal__avatar"
            alt=""
          >
          <input
            id="user__edit__modal__avatar__file image"
            accept="image/*"
            name="avatar"
            type="file"
            class="user__edit__modal__icon user__edit__modal__avatar__photo"
            @change="handleAvatarChange"
          >
        </div>
        <div class="user__edit__modal__form__group">
          <span class="user__edit__modal__title">
            名稱
          </span>
          <input
            id="name"
            v-model="user.name"
            type="text"
            name="name"
            class="user__edit__modal__input"
            maxlength="50"
            required
          >
        </div>
        <div class="user__edit__modal__number">
          {{ user.name ? Number(user.name).length: '0' }} / 50
        </div>
        <div class="user__edit__modal__intro__wrapper">
          <span class="user__edit__modal__intro__title">
            自我介紹
          </span>
          <textarea
            id=""
            v-model="user.introduction"
            name="introduction"
            cols="40"
            rows="6"
            type="text"
            class="user__edit__modal__intro"
            maxlength="160"
          />
        </div>
        <div class="user__edit__modal__number">
          {{ user.introduction ? Number(user.introducation).length: '0' }} / 160
        </div>
      </form>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

%user__edit__icon__style {
  @extend %icon-style;
  background: #ffffff;
  color: #ffffff;
  cursor: pointer;
}
%user__edit__input__style {
  padding-top: 30px;
  padding-left: 10px;
  border-radius: 4px;
  border: none;
  background: $bg-gray;
  width: 100%;
}

.user__edit__modal__container {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width:100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  padding-right: 0px !important;
  .modal__content {
    width: 600px;
    height: 630px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 14px;
    margin-top: 20px;
    position: relative;
  }
}
.show {
  padding-right: 100px;
}
.user__edit__modal__header {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin-bottom: 14px;
  .user__edit__modal__header__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 20px;
    .user__edit__modal__close {
      width: 100%;
      color: $orange;
      cursor: pointer;
      text-align: left;
      opacity: 1;
      text-shadow: none;
    }
    .user__edit__modal__title {
      width: 100%;
      font-weight: 700;
      color: $black;
      text-align: right;
    }
  }
    .user__edit__modal__button__wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    .user__edit__modal__button {
      width: 64px;
      height: 30px;
      background: $orange;
      color: #ffffff;
      border-radius: 100px;
      text-align: center;
    }
  }
}
.user__edit__modal__cover__wrapper {
  width: 100%;
  .user__edit__modal__cover {
    height: 200px;
    width: 600px;
    opacity: 0.6;
  }
  .user__edit__modal__cover__photo {
    mask-image: url('./../assets/icon/icon_photo.svg');
    -webkit-mask-image: url('./../assets/icon/icon_photo.svg');
    @extend %user__edit__icon__style;
    position: absolute;
    top: 20%;
    left: 20%;
  }
  .user__edit__modal__cover__close {
    position: absolute;
    top: 130px;
    right: 40%;
    color: #ffffff;
    font-size: 1.2rem;
  }
}
.user__edit__modal__avatar__wrapper {
  width: 120px;
  height: 55px;
  .user__edit__modal__avatar {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    position: relative;
    top: -80px;
    left: 20px;
    border: 5px solid white;
    opacity: 0.8;
  }
  .user__edit__modal__avatar__photo {
    mask-image: url('./../assets/icon/icon_photo.svg');
    -webkit-mask-image: url('./../assets/icon/icon_photo.svg');
    @extend %user__edit__icon__style;
    position: relative;
    left: -65px;
    bottom: 150px;
  }
}
.user__edit__modal__form__group {
  max-width: 540px;
  margin: 0 auto;
  position: relative;
  .user__edit__modal__title {
    @extend %form-group-title-style;
  }
  .user__edit__modal__input {
    position: relative;
    @extend %user__edit__input__style;
    border-bottom: 2px solid $tx-gray;
    height: 50px;
    font-size: 1rem;
    &:focus {
      outline: none;
      box-shadow: 3px 3px 10px 0px #657786;
    }
  }
}
.user__edit__modal__intro__wrapper {
  max-width: 540px;
  margin: 20px auto 0 auto;
  position: relative;
  .user__edit__modal__intro {
    @extend %user__edit__input__style;
    border-bottom: 2px solid $tx-gray;
    line-height: 1.5rem;
    resize: none;
    &:focus {
      outline: none;
      box-shadow: 3px 3px 10px 0px #657786;
    }
  }
}
.user__edit__modal__intro__title {
  width: 100%;
  @extend %form-group-title-style;
}
.user__edit__modal__number {
  max-width: 540px;
  text-align: right;
  margin: 0 auto;
  font-size: 15px;
  color: $tx-gray;
}
</style>

<script>
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import Spinner from './../components/Spinner.vue'
import { emptyImageFilter } from './../utils/mixins'
export default {
  components: {
    Spinner
  },
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      user: this.initialUser,
      isLoading: false
    }
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  },
  methods: {
    // 處理avatar預覽圖片
    handleAvatarChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.user.avatar = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.avatar = imageURL
        // this.avatar = imageURL
      }
    },
    // 處理cover預覽圖片
    handleCoverChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.user.cover = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.cover = imageURL
        // this.cover = imageURL
      }
    },
    // 處理name, introducation, avatar, cover的資料轉成formData傳給後端
    async handleSubmit (e) {
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: 'error',
            title: '請確實填寫姓名'
          })
          return
        }
        this.isLoading = true
        const form = e.target
        const formData = new FormData(form)
        const { data } = await userAPI.update({ userId: this.user.id, formData })

        this.$emit('after-submit', {
          name: this.user.name,
          introduction: this.user.introduction,
          cover: this.user.cover,
          avatar: this.user.avatar
        })

        const editModal = document.querySelector('#user__edit__modal')
        editModal.checked = false

        this.isLoading = false

        if (data.status !== 'success') {
          this.isLoading = false
          throw new Error(data.message)
        } else {
          this.$router.push({ name: 'user-tweets' })
        }
      } catch (e) {
        console.log(e)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '更新失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
