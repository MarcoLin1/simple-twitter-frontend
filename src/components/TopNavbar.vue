<template>
  <div class="top-navbar-container">
    <div
      v-if="$route.path.slice(0, 5) !== '/user'"
      class="top-navbar-title"
    >
      {{ currentPage }}
    </div>
    <div
      v-else
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
        John Doe
        <div class="top-navbar-text">
          25推文
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isTrue: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.top-navbar-container{
  margin-bottom: 1px;
}
.top-navbar-title {
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  padding: 13px 0 14px 16px;
}
.top-navbar-wrapper {
  display: flex;
  margin-bottom: 20px;
  padding-top: 10px;
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
