<template>
  <div class="top-navbar-container">
    <div
      v-if="!$route.path.includes('user') && !$route.path.includes('detail') && (screenSize==='mobile')"
      class="menu__wrapper"
      @click.stop.prevent="showMenu=true"
    >
      <div class="menu-btn" />
    </div>
    <MobileSideNavbar
      v-if="showMenu && !$route.path.includes('user') && !$route.path.includes('detail')"
      class="side-bar"
      @close="showMenu=false"
    />
    <div
      v-if="$route.path.slice(0, 5) === '/user' || $route.path.slice(0, 7) === '/detail'"
      class="top-navbar-wrapper"
    >
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
        {{ $route.path.slice(0, 14) === '/notifications' ? '通知': currentPage }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MobileSideNavbar from './../components/MobileSideNavbar.vue'
export default {
  components: {
    MobileSideNavbar
  },
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
      userTweetsLength: this.initialUserTweetsLength,
      showMenu: false
    }
  },
  computed: {
    ...mapState(['screenSize'])
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
.side-bar{
  z-index: 3
}
.top-navbar-container{
  height: 55px;
  display: flex;

  .menu__wrapper{
    cursor: pointer;

    .menu-btn{
      width: 24px;
      height: 2px;
      background: $black;
      position: relative;

      margin: calc(52px / 2 ) 10px;
      &::before, &::after{
        position: absolute;
        content: '';
        width: 24px;
        height: 2px;
        background: $black;
      }
      &::before{
        top: -8px;
        right: 0;
      }
      &::after{
        top: 8px;
        right: 0;
      }
    }
  }
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
    margin-left: 24px;
    @include text-style(19px, 900, $black);
    .top-navbar-text {
      @include text-style(13px, 500, $tx-gray);
      line-height: 23px;
    }
    .text-title{
      @include text-style(18px, 700, $black);
      margin-left: 24px;
    }
  }

}
</style>
