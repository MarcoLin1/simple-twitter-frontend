<template>
  <form
    action=""
    @click.stop.prevent="handleSubmit"
  >
    <div class="new__post__modal__wrapper">
      <div
        id="reply__post__modal"
        class="modal"
        tabindex="-1"
      >
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                >&times;</span>
              </button>
            </div>
            <div class="modal__body">
              <div class="modal__body__wrapper">
                <Post
                  :noborder="noborder"
                  :noreaction="noreaction"
                />
                <div class="modal__body__wrapper">
                  <span>回覆給<span class="modal__body__wrapper__account">@apple</span></span>
                </div>
                <div class="modal__body__wrapper__reply">
                  <img
                    src="https://www.holoface.photos/static/images/products/figurephotohalf01.jpg"
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
                </div>
              </div>
            </div>
            <div class="modal__footer">
              <button
                type="submit"
                class="modal__footer__button"
              >
                推文dfs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .new__post__modal__wrapper {
    .modal__dialog {
      margin: 3rem auto;
      .modal__content {
        width: 100%;
        height: 100%;
        max-width: 600px;
        min-height: 450px;
        margin: auto;
        background: #ffffff;
        border-radius: 14px;
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
      display: flex;
      flex-direction: column;
      .modal__body__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span{
        @include text-style(13px 500, $tx-gray)
      }
      .modal__body__wrapper__reply{
        display: flex;
        padding: 15px;
      }
    }
    .modal__body__input {
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
      margin-right: 15px;
      padding-bottom: 15px;
      .modal__footer__button {
        border-radius: 100px;
        background: $orange;
        border: none;
        width: 64px;
        height: 40px;
        cursor: pointer;
        color: #ffffff;
      }
    }
  }
</style>

<script>
import Post from './../components/Post.vue'
export default {
  components: {
    Post
  },
  data () {
    return {
      tweet: '',
      noreaction: true,
      noborder: true
    }
  },
  methods: {
    handleSubmit () {
      if (!this.tweet) {
        console.log('You can not submit blank value')
      }
    }
  }
}
</script>
