<template>
  <div class="main__container">
    <div class="left__content">
      <SideNavBar />
    </div>
    <div class="middle__content">
      <OnlineUser />
    </div>
    <div class="right__content">
      <ChatRoom />
    </div>
  </div>
</template>
<script>
import OnlineUser from './../components/OnlineUser.vue'
import ChatRoom from './../components/ChatRoom.vue'
import SideNavBar from './../components/SideNavbar.vue'

export default {
  components: {
    OnlineUser,
    ChatRoom,
    SideNavBar
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .main__container {
    display: grid;
    grid-template-columns: 1fr 4fr 30px 4fr  11fr ;
    grid-template-areas: " . left . middle right";
    .left__content{
      grid-area: left;
    }
    .right__content{
      grid-area: right;
    }
    .middle__content{
      grid-area: middle
    }
  }
</style>
