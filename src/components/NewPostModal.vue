<template>
  <div class="new__post__modal__wrapper">
    <div
      id="new__post__modal"
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
              <img
                src="https://www.holoface.photos/static/images/products/figurephotohalf01.jpg"
                alt=""
                class="modal__body__img"
              >
              <textarea
                rows="8"
                cols="40"
                type="text"
                maxlength="140"
                placeholder="有什麼新鮮事"
                class="modal__body__input"
              />
            </div>
          </div>
          <div class="modal__footer">
            <button
              type="submit"
              class="modal__footer__button"
            >
              推文
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
        max-height: 300px;
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
      margin: 19px 0 0 19px;
      .modal__body__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
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
