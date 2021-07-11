<template>
  <div class="user__followers__container">
    <TopNavbar
      :user="user"
      :current-page="'fu06'"
    />
    <div class="user__followers__main__wrapper">
      <UsersList :initial-user="user" />
    </div>
  </div>
</template>

<script>
import TopNavbar from './../components/TopNavbar.vue'
import UsersList from './../components/UsersList.vue'
import usersAPI from './../apis/users'
// const dummyData = {
//   users:
//     {
//       id: 1,
//       name: 'root',
//       email: 'root@example.com',
//       password: '$2a$10$K2x6pQHkzPEKzw86x8Tc0.bfW7QVdA2Ls4AXBFkFu7xHG3UgA4Mli',
//       isAdmin: true,
//       image: 'https://i.pravatar.cc/300',
//       createdAt: '2021-07-05T09:58:39.000Z',
//       updatedAt: '2021-07-05T10:31:19.000Z',
//       Followers: [],
//       FollowerCount: 0,
//       TweetCount: 15,
//       isFollowed: false
//     },
//   isAuthenticated: true
// }
export default {
  components: {
    TopNavbar,
    UsersList
  },
  data () {
    return {
      user: []
    }
  },
  created () {
    const { id } = this.$route.params
    console.log(id)
    this.fetchUser(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        console.log('123')
        const { data } = await usersAPI.getUser({ userId })
        console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.user = data
      } catch (error) {
        console.log(error)
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
