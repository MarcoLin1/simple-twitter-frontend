<template>
  <div class="top-navbar-container">
    <div
      v-if="$route.path.slice(0, 5) === '/user' || $route.path.slice(0, 7) === '/detail'"
      class="top-navbar-wrapper"
    >
      <!-- 記得改連結 -->
      <div
        class="top-navbar-icon"
        @click="$router.go(-1)"
      >
        <span>
          &larr;</span>
      </div>
      <div class="top-navbar-name">
        {{ name }}
        <div
          class="top-navbar-text"
          :class="{'text-title':!userTweetsLength && userTweetsLength !== 0}"
        >
          {{ userTweetsLength }}推文
        </div>
      </div>
    </div>
    <div
      v-else
      class="top-navbar-title"
    >
      <div
        v-if="$route.path.slice(0, 7) === '/detail'"
        class="top-nav-title-icon"
      >
        <span>
          &larr;</span>
      </div>
      <div class="top-navbar-title-text">
        {{ currentPage }}
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import userAPI from './../apis/users'
export default {
  props: {
    currentPage: {
      type: String,
      required: true
    },
    initialName: {
      type: [Number, String],
      default: ''
    },
    initialUserTweetsLength: {
      type: [Number, String],
      default: 0
    }

  },
  data () {
    return {
      name: this.initialName,
      userTweetsLength: this.initialUserTweetsLength
    }
  },
  watch: {
    initialName (newValue) {
      this.name = newValue
    },
    initialUserTweetsLength (newValue) {
      this.userTweetsLength = newValue
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.top-navbar-container{
  height: 55px;
}
.top-navbar-title {
  @include text-style(18px, 700, $black);
  text-align: left;
  line-height: 55px;
  padding: 0 0 0 16px;
  margin-left: -1px;
}
.top-navbar-wrapper {
  display: flex;
  height: 55px;
  margin: auto 0;
  .top-navbar-icon {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    width: 10%;
    margin-left: 10px;
    cursor: pointer;
    color: $black;
    text-decoration: none;
    &:hover {
      color: $orange;
    }
  }
  .top-navbar-name {
    width: 100%;
    font-weight: 900;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include text-style(19px, 900, $black);
    .top-navbar-text {
      @include text-style(13px, 500, $tx-gray);
      line-height: 23px;
    }
    .text-title{
      @include text-style(18px, 700, $black);
    }
  }

}
</style>
