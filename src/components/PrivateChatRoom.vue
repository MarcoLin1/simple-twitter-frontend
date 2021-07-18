<template>
  <form
    action=""
    @submit.stop.prevent="handleSubmit"
  >
    <div class="chat__room__container">
      <div class="chat__room__top__wrapper">
        <div class="chat__room__title">
          {{ initialListener.name ? initialListener.name: '聊天室' }}
        </div>
      </div>
      <div
        class="chat__room__main__wrapper"
      >
        <div
          v-for="data in allData"
          :key="data.id"
        >
          <div
            class="chat__room__message__wrapper"
          >
            <div
              v-if="data.id !== currentUser.id"
              class="chat__room__left__wrapper"
            >
              <div class="chat__room__user">
                <img
                  :src="data.avatar"
                  alt=""
                  class="user__image"
                >
                <div class="chat__room__text__container">
                  <div class="chat__room__text__wrapper">
                    <div class="chat__room__text">
                      {{ data.content }}
                    </div>
                  </div>
                  <div class="chat__room__time">
                    {{ data.createdAt }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="data.id === currentUser.id"
              class="chat__room__right__wrapper"
            >
              <div class="chat__room__right__text__wrapper">
                <div class="chat__room__right__text">
                  {{ data.content }}
                </div>
              </div>
              <div class="chat__room__time">
                {{ data.createdAt }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat__room__bottom__wrapper">
        <input
          v-model="message"
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
  </form>
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
      max-height: fit-content;
      overflow-y: scroll;
      justify-content: flex-end;
      margin-top: 20px;
      .chat__room__main__wrapper {
        max-height: fit-content;
        overflow-y: scroll;
        justify-content: center;
        margin-top: 20px;
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
                  word-break: break-all;
                  line-height: 1.2rem;
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
              word-break: break-all;
              line-height: 1.2rem;
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
import { mapState } from 'vuex'
import { Toast } from '../utils/helper'
export default {
  name: 'ChatRoom',
  props: {
    initialListener: {
      type: [Array, Object]
    },
    initialMessages: {
      type: [Array, Object]
    }
  },
  data () {
    return {
      message: '',
      allData: this.initialMessages,
      listener: this.initialListener
    }
  },
  // watch: {
  //   initialMessages (newValue) {
  //     this.allData = {
  //       ...this.allData,
  //       newValue
  //     }
  //   }
  // },
  computed: {
    ...mapState(['currentUser'])
  },

  mounted () {
  },
  methods: {
    handleSubmit () {
      if (!this.message) {
        Toast.fire({
          icon: 'warning',
          title: '沒有話要說，就不要亂按'
        })
        return
      }
      if (!this.message.trim()) {
        Toast.fire({
          icon: 'warning',
          title: '送一堆空格要幹嘛!?'
        })
        return
      }
      this.$socket.emit('privateMessage', {
        id: this.currentUser.id,
        listenerId: this.listener.id,
        content: this.message,
        createdAt: new Date()
      })
      this.message = ''
      // this.allData.push(this.messages)
    }
  }
}
</script>
