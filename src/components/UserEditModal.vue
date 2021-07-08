<template>
  <div
    id="user__edit__modal"
    class="user__edit__modal__container  modal"
    tabindex="-1"
  >
    <form
      action=""
      class="modal__dialog modal__content"
    >
      <div class="user__edit__modal__header">
        <div class="user__edit__modal__header__wrapper">
          <button
            class="user__edit__modal__close close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span
              aria-hidden="true"
            >&times;</span>
          </button>
          <div class="user__edit__modal__title">
            編輯個人資料
          </div>
        </div>
        <div class="user__edit__modal__button__wrapper">
          <button
            type="button"
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
      </div>
      <div class="user__edit__modal__avatar__wrapper">
        <img
          :src="user.avatar"
          class="user__edit__modal__avatar"
          alt=""
        >
      </div>
      <div class="user__edit__modal__form__group">
        <span class="user__edit__modal__title">
          名稱
        </span>
        <input
          type="text"
          class="user__edit__modal__input"
        >
      </div>
      <div class="user__edit__modal__number">
        8 / 50
      </div>
      <div class="user__edit__modal__intro__wrapper">
        <span class="user__edit__modal__intro__title">
          自我介紹
        </span>
        <textarea
          id=""
          name=""
          cols="40"
          rows="6"
          type="text"
          class="user__edit__modal__intro"
        />
      </div>
      <div class="user__edit__modal__number">
        0 / 160
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.user__edit__modal__container {
  width:600px;
  height: 654px;
  margin: 0 auto;
  border-radius: 14px;
  position: relative;
  background: #ffffff;
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
    border: none;
    width: 100%;
    height: 50px;
    background: #f5f8fa;
    border-bottom: 2px solid $tx-gray;
    border-radius: 4px;
    font-size: 1rem;
    padding-top: 30px;
    padding-left: 10px;
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
    width: 100%;
    border: none;
    background: #f5f8fa;
    border-bottom: 2px solid $tx-gray;
    border-radius: 4px;
    padding-top: 30px;
    padding-left: 10px;
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
    }
  }
}
</script>
