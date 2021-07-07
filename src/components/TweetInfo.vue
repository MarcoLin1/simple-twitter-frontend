<template>
  <div class="tweet__info__container">
    <div class="tweet__info__top__wrapper">
      <div class="tweet__info__image_wrapper">
        <img
          src="https://pic.pimg.tw/missrachelnina/1595839554-464849265-g.jpg"
          alt=""
          class="tweet__info__image"
        >
      </div>
      <div class="tweet__info__title__wrapper">
        <div class="tweet__info__name">
          Apple
        </div>
        <div class="tweet__info__account">
          @apple
        </div>
      </div>
    </div>
    <div class="tweet__info__text__wrapper">
      <div class="tweet__info__text">
        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
      </div>
    </div>
    <div class="tweet__info__time__wrapper">
      <div class="tweet__info__time">
        上午 10:05
      </div>·
      <div class="tweet__info__date">
        2020年6月10日
      </div>
    </div>
    <div class="tweet__info__reply__wrapper">
      <div class="tweet__info__reply__number">
        34
        <span class="tweet__info__rely__text">回覆</span>
      </div>
      <div class="tweet__info__like__number">
        808
        <span class="tweet__info__like__text">喜歡次數</span>
      </div>
    </div>
    <div class="tweet__info__icon__wrapper">
      <div class="tweet__info__icon__message__wrapper">
        <div class="tweet__info__icon__message" />
      </div>
      <div class="tweet__info__icon__like__wrapper">
        <div class="tweet__info__icon__like" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .tweet__info__container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 15px 0 15px;
    border: 1px solid $light-gray;
  }
  .tweet__info__top__wrapper {
    display: flex;
    align-items: center;
    margin: 15px 0 15px 0;
    .tweet__info__image_wrapper {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .tweet__info__image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .tweet__info__name, .tweet__info__account {
    font-size: 15px;
  }
  .tweet__info__name {
    font-weight: 700;
    color: $black;
  }
  .tweet__info__account {
    color: $tx-gray;
  }
  .tweet__info__text__wrapper {
    margin-bottom: 15px;
    .tweet__info__text {
      color: $black;
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }
  .tweet__info__time__wrapper {
    display: flex;
    color: $tx-gray;
    font-size: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid $light-gray;
  }
  .tweet__info__reply__wrapper {
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid $light-gray;
    font-size: 15px;
    .tweet__info__reply__number {
      margin-right: 20px;
      font-weight: bold;
    }
    .tweet__info__like__number {
      font-weight: bold;
    }
    .tweet__info__rely__text, .tweet__info__like__text  {
      font-weight: normal;
      color: $tx-gray
    }
  }
  .tweet__info__icon__wrapper {
    display: flex;
    justify-content: space-between;
    width: auto;
    max-width: 150px;
    margin-top: 5px;
    margin-bottom: 5px;
    .tweet__info__icon__message__wrapper, .tweet__info__icon__like__wrapper {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: $orange;
      }
    }
    .tweet__info__icon__message {
      width: 30px;
      height: 30px;
      @extend %icon-style;
      mask-image: url('./../assets/icon/icon_message.svg');
      -webkit-mask-image: url('./../assets/icon/icon_message.svg');
      cursor: pointer;
      &:hover {
        background: #ffffff;
      }
    }
    .tweet__info__icon__like {
      width: 30px;
      height: 30px;
      @extend %icon-style;
      mask-image: url('./../assets/icon/icon_like.svg');
      -webkit-mask-image: url('./../assets/icon/icon_like.svg');
      cursor: pointer;
      &:hover {
        background: #ffffff;
      }
    }
  }

  @media screen and (min-width: 576px) {
    .tweet__info__text__wrapper {
      .tweet__info__text {
        font-size: 23px;
        line-height: 34px;
      }
    }
    .tweet__info__reply__wrapper {
      margin-top: 20px;
      padding-bottom: 20px;
      font-size: 19px;
    }
    .tweet__info__icon__wrapper {
      margin-top: 20px;
      margin-bottom: 14px;
      max-width: 200px;
      .tweet__info__icon__message__wrapper, .tweet__info__icon__like__wrapper {
        width: auto;
        height: auto;
        border-radius: none;
        &:hover {
          background: inherit;
        }
      }
      .tweet__info__icon__message {
        mask-image: url('./../assets/icon/icon_reply.svg');
        -webkit-mask-image: url('./../assets/icon/icon_reply.svg');
        &:hover {
          background: $orange;
        }
      }
      .tweet__info__icon__like {
        mask-image: url('./../assets/icon/icon_like_tweet_info.svg');
        -webkit-mask-image: url('./../assets/icon/icon_like_tweet_info.svg');
        &:hover {
          background: $orange;
        }
      }
    }
  }
</style>
