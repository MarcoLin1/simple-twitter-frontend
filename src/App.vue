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
    ...mapState(['currentUser'])
  },
  created () {
    console.log('app.vue created')
  }

}
</script>
