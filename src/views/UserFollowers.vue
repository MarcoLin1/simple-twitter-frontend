<template>
  <div class="user__followers__container">
    <TopNavbar
      :user="user"
      :current-page="currentPage"
    />
    <div class="user__followers__main__wrapper">
      <UsersList />
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
import UsersList from './../components/UsersList.vue'
const dummyData = {
  users:
    {
      id: 1,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$K2x6pQHkzPEKzw86x8Tc0.bfW7QVdA2Ls4AXBFkFu7xHG3UgA4Mli',
      isAdmin: true,
      image: 'https://i.pravatar.cc/300',
      createdAt: '2021-07-05T09:58:39.000Z',
      updatedAt: '2021-07-05T10:31:19.000Z',
      Followers: [],
      FollowerCount: 0,
      TweetCount: 15,
      isFollowed: false
    },
  isAuthenticated: true
}
export default {
  components: {
    TopNavbar,
    UsersList
  },
  data () {
    return {
      user: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: '',
        tweetLength: '',
        isFollowed: false
      },
      currentPage: 'UserFollowers'
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.user = {
        ...this.user,
        ...dummyData.users
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__followers__main__wrapper {
    width: 600px;

  }
</style>
