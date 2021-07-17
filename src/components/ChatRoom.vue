<template>
  <div class="chat__room__container">
    <div class="chat__room__top__wrapper">
      <div class="chat__room__title">
        公開聊天室
      </div>
    </div>
    <div class="chat__room__main__wrapper">
      <div class="chat__room__main__info__wraaper">
        <div class="chat__room__info">
          <div class="chat__room__info__text">
            Marco 上線囉
          </div>
        </div>
        <div class="chat__room__info">
          <div class="chat__room__info__text">
            Tina 上線囉
          </div>
        </div>
        <div class="chat__room__info">
          <div class="chat__room__info__text">
            YJ 上線囉
          </div>
        </div>
        <div class="chat__room__info">
          <div class="chat__room__info__text">
            翊廷 上線囉
          </div>
        </div>
      </div>
      <div class="chat__room__message__wrapper">
        <div class="chat__room__left__wrapper">
          <div class="chat__room__user">
            <img
              src="https://www.holoface.photos/static/images/products/figurephotohalf01.jpg"
              alt=""
              class="user__image"
            >
            <div class="chat__room__text__container">
              <div class="chat__room__text__wrapper">
                <div class="chat__room__text">
                  今天天氣好好，但是要一直coding不能睡覺
                </div>
              </div>
              <div class="chat__room__time">
                下午4:21
              </div>
            </div>
          </div>
        </div>
        <div class="chat__room__right__wrapper">
          <div class="chat__room__right__text__wrapper">
            <div class="chat__room__right__text">
              最近還好嗎？跟你沒什麼好聊的
            </div>
          </div>
          <div class="chat__room__time">
            下午5:59
          </div>
        </div>
      </div>
      <div class="chat__room__main__leave__wraaper">
        <div class="chat__room__leave">
          <div class="chat__room__leave__text">
            Bernard 離線了 QQ
          </div>
        </div>
      </div>
    </div>
    <div class="chat__room__bottom__wrapper">
      <input
        type="text"
        class="chat__room__input"
        placeholder="請輸入訊息..."
      >
      <button
        type="submit"
        class="chat__room__button"
      >
        PUSH
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .chat__room__container {
    width: 100%;
    max-width: 700px;
    height: 100vh;
    display: grid;
    grid-template-rows: 5% 85% 10%;
    background: #ecf0f3;
    margin: 0 auto;
    border-left: 1px solid $light-gray;
    .chat__room__top__wrapper {
      border-bottom: 1px solid $line-gray;
      height: 55px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
      padding: 14px 0 14px 16px;
    }
    .chat__room__main__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .chat__room__main__info__wraaper, .chat__room__main__leave__wraaper {
        width: 100%;
        text-align: center;
        width: auto;
        margin: 20px auto;
        .chat__room__info, .chat__room__leave {
          display: flex;
          justify-content: center;
          margin: 10px 0;
          width: auto;
          height: 25px;
        }
        .chat__room__info__text, .chat__room__leave__text {
          background: #a5a5a55b;
          color: $tx-gray;
          padding: 0 10px;
          border-radius: 10px;
          line-height: 25px;
          font-size: 0.8rem;
        }
      }
      .chat__room__message__wrapper {
        .chat__room__left__wrapper {
          .chat__room__user {
            padding: 10px;
            display: flex;
            .user__image {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 10px;
              cursor: pointer;
            }
            .chat__room__text__container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              .chat__room__text__wrapper {
                background: #9494944b;
                width: 100%;
                min-width: 200px;
                padding: 10px;
                border-radius: 10px;
                border-bottom-left-radius: 0px;
                .chat__room__text {
                  font-size: 0.9rem;
                  color: $black;
                }
              }
            }
          }
        }
        .chat__room__right__wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 10px;
          .chat__room__right__text__wrapper {
            background: #fd6c0a;
            border-radius: 10px;
            border-bottom-right-radius: 0;
            padding: 10px;
            .chat__room__right__text {
              text-align: right;
              color: #ffffff;
              font-size: 0.9rem;
            }
          }
        }
        .chat__room__time {
          font-size: 0.5rem;
          margin-top: 5px;
        }
      }
    }
    .chat__room__bottom__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      padding: 15px 5px 0 5px;
      border-top: 1px solid $line-gray;
      .chat__room__input {
        box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px rgb(255, 255, 255);
        border: none;
        border-radius: 100px;
        background: #ecf0f3;
        padding: 2px 0 2px 20px;
        width: 90%;
        margin-right: 10px;
        font-size: 0.8rem;
        height: 35px;
      }
      .chat__room__button {
        width: 50px;
        height: 30px;
        border-radius: 10px;
        color: #a7a7a7;
        font-size: 0.6rem;
        box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
      }
    }
  }
</style>

<script>
export default {
  name: 'ChatRoom',
  data () {
    return {
      message: ''
    }
  }
  // sockets: {
  //   connect () {
  //     console.log('connect!!!!!!!!!')
  //   }
  // }
}
</script>
