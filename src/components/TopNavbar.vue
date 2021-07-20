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
        <div class="top-navbar-text">
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
  },
  created () {
    // const { id } = this.$route.params
    // if (!id) {
    //   console.log(id)
    // } else {
    //   this.fetchUserData(id)
    // }
  },
  methods: {
    // async fetchUserData (userId) {
    //   try {
    //     const { data } = await userAPI.getUserTweets({ userId })
    //     this.name = data[0].User.name
    //     this.userTweetsLength = data.length
    //   } catch (e) {
    //     console.log(e)
    //     // Toast.fire({
    //     //   icon: 'error',
    //     //   title: 'user data讀取失敗'
    //     // })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.top-navbar-title {
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  padding: 13px 0 14px 16px;
  margin-left: -1px;
}
.top-navbar-wrapper {
  display: flex;
  // padding-bottom: 10px;
  // padding-top: 10px;
  .top-navbar-icon {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    width: 15%;
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
    .top-navbar-text {
      font-weight: 500;
      font-size: 13px;
      margin-top: 5px;
      color: $tx-gray;
    }
  }
}
</style>
