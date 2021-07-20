<template>
  <div id="app">
    <router-view />
    <div class="m-4" />
  </div>
</template>

<script>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {

}
</script>
<style lang="scss" scoped>
@import './assets/scss/main.scss';
#app{
  max-width: 1440px;
  margin: 0 auto;
}
</style>
