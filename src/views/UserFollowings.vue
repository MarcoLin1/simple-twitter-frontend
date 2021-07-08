<template>
  <div class="user__followings__container">
    <!-- <div class="user__followings__side__navbar__wrapper">
      <SideNavbar />
    </div> -->
    <div class="user__followings__main__wrapper">
      <!-- <TopNavbar
        :user="user"
        :current-page="currentPage"
      /> -->
      <UsersList />
    </div>
    <!-- <div class="user__followings__top__users__list__wrapper">
      <TopUsersList />
    </div> -->
  </div>
</template>

<script>
// import SideNavbar from './../components/SideNavbar.vue'
// import TopNavbar from './../components/TopNavbar.vue'
// import TopUsersList from './../components/TopUsersList.vue'
import UsersList from './../components/UsersList.vue'
const dummyData = {
  tweets: [
    {
      UserId: 1,
      description: 'It is very hard to overcome this question',
      createdAt: '2019',
      replyCount: 1,
      likeCount: 1,
      isLike: true,
      isFollowing: true,
      user: {
        name: 'apple',
        account: 'apple',
        avatar: 'https://loremflickr.com/320/240/people?random'
      }
    },
    {
      UserId: 2,
      description: 'It is very hard to overcome this question',
      createdAt: '2020',
      replyCount: 2,
      likeCount: 2,
      isLike: true,
      isFollowing: false,
      user: {
        name: 'pen',
        account: 'pen',
        avatar: 'https://loremflickr.com/320/240/people?random'
      }
    },
    {
      UserId: 3,
      description: 'It is very hard to overcome this question',
      createdAt: '2023',
      replyCount: 3,
      likeCount: 3,
      isLike: true,
      isFollowing: false,
      user: {
        name: 'dog',
        account: 'DG',
        avatar: 'https://loremflickr.com/320/240/people?random'
      }
    },
    {
      UserId: 4,
      description: 'It is very hard to overcome this question',
      createdAt: '2016',
      replyCount: 4,
      likeCount: 4,
      isLike: true,
      isFollowing: true,
      user: {
        name: 'google',
        account: 'GG',
        avatar: 'https://loremflickr.com/320/240/people?random'
      }
    }
  ]
}
const dummyUser = {
  users:
    {
      id: 1,
      name: 'google',
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
    }
}
export default {
  components: {
    // SideNavbar,
    // TopNavbar,
    // TopUsersList,
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
      userFollowingsTweets: [],
      currentPage: 'UserFollowings'
    }
  },
  created () {
    this.fetchUser()
    this.fetchTweets()
  },
  methods: {
    fetchUser () {
      this.user = {
        ...this.user,
        ...dummyUser.users
      }
    },
    fetchTweets () {
      const { tweets } = dummyData
      this.userFollowingsTweets = tweets
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .user__followings__container {
    margin-top: 26px;
  }
  .user__followings__main__wrapper {
    width: 600px;
    // border: 1px solid $light-gray;
  }
</style>
