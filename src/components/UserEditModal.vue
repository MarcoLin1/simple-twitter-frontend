<template>
  <div
    id="user__edit__modal"
    class="user__edit__modal__container modal"
    role="dialog"
    aria-labelledby="user__edit__modal"
  >
    <form
      action=""
      class="modal__dialog modal__content"
      @submit.stop.prevent="handleSubmit"
    >
      <div class="user__edit__modal__header">
        <div class="user__edit__modal__header__wrapper">
          <button
            class="user__edit__modal__close close"
            aria-label="Close"
          >
            <span
              aria-hidden="true"
              data-dismiss="modal"
            >&times;</span>
          </button>
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
          :src="user.cover"
          class="user__edit__modal__cover"
          alt=""
        >
        <input
          id="user__edit__modal__cover__file"
          accept="image"
          type="file"
          class="user__edit__modal__icon user__edit__modal__cover__photo"
          @change="handleCoverChange"
        >
        <button
          class="user__edit__modal__cover__close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span
            aria-hidden="true"
            data-bs-dismiss="modal"
          >&times;</span>
        </button>
        <div class="user__edit__modal__icon user__edit__modal__cover__delete" />
      </div>
      <div class="user__edit__modal__avatar__wrapper">
        <img
          :src="user.avatar"
          class="user__edit__modal__avatar"
          alt=""
        >
        <input
          id="user__edit__modal__avatar__file"
          accept="image"
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
          v-model="user.name"
          type="text"
          class="user__edit__modal__input"
          maxlength="50"
          required
        >
      </div>
      <div class="user__edit__modal__number">
        {{ user.name.length }} / 50
      </div>
      <div class="user__edit__modal__intro__wrapper">
        <span class="user__edit__modal__intro__title">
          自我介紹
        </span>
        <textarea
          id=""
          v-model="user.introduction"
          name=""
          cols="40"
          rows="6"
          type="text"
          class="user__edit__modal__intro"
          maxlength="160"
        />
      </div>
      <div class="user__edit__modal__number">
        {{ user.introduction.length }} / 160
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

%user__edit__icon__style {
  @extend %icon-style;
  position: absolute;
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
  width:600px;
  height: 654px;
  margin: 0 auto;
  border-radius: 14px;
  transform: translate(60%, 20px);
  background: #ffffff;
  padding-right: 0px !important;
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
    top: 135px;
    left: 20%;
  }
  .user__edit__modal__cover__close {
    position: absolute;
    top: 135px;
    right: 40%;
    color: #ffffff;
    font-size: 1.2rem;
  }
}
.user__edit__modal__avatar__wrapper {
  width: 120px;
  height: 80px;
  .user__edit__modal__avatar {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    position: absolute;
    top: 195px;
    left: 15px;
    border: 5px solid white;
    opacity: 0.8;
  }
  .user__edit__modal__avatar__photo {
    mask-image: url('./../assets/icon/icon_photo.svg');
    -webkit-mask-image: url('./../assets/icon/icon_photo.svg');
    @extend %user__edit__icon__style;
    left: -80px;
    top: 240px;
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
  height: 100%;
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
const dummyUser =
    {
      id: 1,
      name: 'John Doe',
      account: 'heyjohne',
      avatar: 'https://i.imgur.com/27eBUkt.jpg',
      cover: 'https://i.imgur.com/ZDk9KqZ.png',
      introduction: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      followerCount: 12,
      followingCount: 333
    }
export default {
  data () {
    return {
      user: []
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.user = dummyUser
    },
    handleAvatarChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.user.avatar = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.avatar = imageURL
      }
    },
    handleCoverChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.user.cover = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.cover = imageURL
      }
    },
    // 處理name, introducation, avatar, cover的資料轉成formData傳給後端
    handleSubmit (e) {
      if (!this.user.name) {
        console.log('please fill in your name')
      }
    }
  }
}
</script>
