<template>
  <div id="app">
    <router-view />
    <div class="m-4" />
  </div>
</template>

<script>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isSmallSize'])
  },
  created () {
    window.addEventListener('resize', this.resizeEvent)
  },
  mounted () {
    if (window.innerWidth <= 480) {
      this.$store.commit('changeScreen', 'mobile')
    } else if (window.innerWidth <= 768) {
      this.$store.commit('changeScreen', 'tablet')
    } else if (window.innerWidth <= 992) {
      this.$store.commit('changeScreen', 'smallScreen')
    } else {
      this.$store.commit('changeScreen', 'bigScreen')
    }
  },
  methods: {
    resizeEvent (e) {
      const newWidth = window.innerWidth
      if (newWidth <= 480) {
        this.$store.commit('changeScreen', 'mobile')
      } else if (newWidth <= 768) {
        this.$store.commit('changeScreen', 'tablet')
      } else if (newWidth <= 992) {
        this.$store.commit('changeScreen', 'smallScreen')
      } else {
        this.$store.commit('changeScreen', 'bigScreen')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/main.scss';
#app{
  max-width: 1440px;
  margin: 0 auto;
}
</style>
