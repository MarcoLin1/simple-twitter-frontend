<template>
  <div class="user__likes__container">
    <div class="user__likes__main__wrapper">
      <UserProfile />
      <UserPostButton />
      <UserLikesPost
        v-for="post in userLikes"
        :key="post.id"
        :initial-post="post"
      />
    </div>
  </div>
</template>

<script>
import UserProfile from './../components/UserProfile.vue'
import UserLikesPost from './../components/UserLikesPost.vue'
import UserPostButton from './../components/UserPostButton.vue'
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
// import {Toast} from './../utils/helper'
export default {
  name: 'UserLikes',
  components: {
    UserProfile,
    UserLikesPost,
    UserPostButton
  },
  data () {
    return {
      userLikes: [],
      posts: [
        {
          id: '1',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
          createdTime: '3 小時',
          isLiked: true
        },
        {
          id: '2',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatatirure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
          createdTime: '6月25日',
          isLiked: false
        },
        {
          id: '3',
          account: '@apple',
          name: 'Apple',
          discription: 'Nulla Lorem mollit cupidatatirure. Laborum magna nulla duis ullamcocillum dolor. Voluptate exerc',
          createdTime: '3 小時',
          isLiked: true
        }
      ]
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUserLikes(id)
  },
  methods: {
    async fetchUserLikes (userId) {
      try {
        const { data } = await userAPI.getUserLikes({ userId })
        this.userLikes = data
        console.log(data)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '喜歡的內容讀取失敗，請稍候再試'
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__likes__container {
    display: flex;
    justify-content: space-around;
  }
  .user__likes__main__wrapper {
    width: 100%;
    max-width: 600px;
  }
</style>
