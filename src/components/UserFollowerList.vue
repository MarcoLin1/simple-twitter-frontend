<template>
  <div class="users__list__container">
    <div
      v-if="followers[0].Followers.name === null"
      class="users__list__main__container"
    >
      <div
        class="empty-message"
      >
        目前沒有跟隨者內容哦！
      </div>
    </div>
    <template v-else>
      <div
        v-for="follower in followers"
        :key="follower.Followers.id"
        class="users__list__main__wrapper"
      >
        <router-link
          class="users__list__image__wrapper"
          :to="{name: 'user-tweets', params: {id: follower.Followers.id}}"
        >
          <img
            :src="follower.Followers.avatar | emptyImage"
            alt=""
            class="users__list__image"
          >
        </router-link>
        <div class="users__list__content__wrapper">
          <div class="users__list__name__wrapper">
            <div class="users__list__name">
              {{ follower.Followers.name }}
            </div>
            <div class="users__list__account">
              @{{ follower.Followers.account }}
            </div>
          </div>
          <div class="users__list__text__wrapper">
            {{ follower.Followers.introduction }}
          </div>
          <div class="users__list__button__wrapper">
            <button
              v-if="follower.Followers.isFollowing"
              type="submit"
              class="users__list__button__following"
              @click.stop.prevent="removeFollowing(follower.Followers.id)"
            >
              正在跟隨
            </button>
            <button
              v-else
              type="submit"
              class="users__list__button__unfollowing"
              @click.stop.prevent="addFollowing(follower.Followers.id)"
            >
              跟隨
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  %text-normal-style {
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
  }
  .users__list__container {
    height: 100vh;
    min-width: 300px;
    max-width: 600px;
    margin: 0 auto;
    .users__list__item__wrapper {
      display: flex;
      width: 40%;
      justify-content: space-around;
      .users__list__item {
        width: 100%;
        text-align: center;
        @extend %text-normal-style;
      }
      .users__list__item__button {
        width: 100%;
        border: none;
        background: none;
        padding-bottom: 14px;
        color: $tx-gray;
        text-decoration: none;
      &:focus {
          border-bottom: 1px solid $orange;
          color: $orange;
        }
      &:hover {
        color: $orange;
      }
      }
    }
  }
  .users__list__main__wrapper {
    display: flex;
    position: relative;
    padding: 10px 15px 10px 15px;
    border-top: 1px solid $light-gray;
    border-bottom: 1px solid $light-gray;
    margin-bottom: -1px;
    .users__list__image__wrapper {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .users__list__image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .users__list__name__wrapper {
      .users__list__name {
        @extend %text-normal-style;
        margin-bottom: 5px;
      }
      .users__list__account {
        margin-bottom: 5px;
        color: $tx-gray;
        font-size: 15px;
      }
    }
    .users__list__text__wrapper {
      line-height: 22px;
      color: $black;
      font-size: 15px;
    }
    .users__list__button__wrapper {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .users__list__button__following {
        width: 100%;
        height: 30px;
        border-radius: 100px;
        background: $orange;
        color: #ffffff;
        border: none;
        font-size: 15px;
        padding: 6px 16px 8px 16px;
        font-weight: 700;
      }
      .users__list__button__unfollowing {
        width: 62px;
        height: 30px;
        border-radius: 100px;
        border: 1px solid $orange;
        background: none;
        color: $orange;
        font-weight: 700;
        font-size: 15px;
      }
    }
  }
</style>

<script>
import { Toast } from '../utils/helper'
import { emptyImageFilter } from './../utils/mixins'
import userAPI from './../apis/users'
import { mapState } from 'vuex'
export default {
  mixins: [emptyImageFilter],
  props: {
    initialFollowers: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      followers: this.initialFollowers,
      userId: ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialFollowers (newValue) {
      this.followers = [
        ...newValue
      ]
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchFollowers(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchFollowers(id)
  },
  methods: {
    async fetchFollowers (userId) {
      try {
        const { data } = await userAPI.getUserFollowers({ userId })
        this.followers = data
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await userAPI.addFollowShip({ id: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$emit('update-follower-data', userId)
        this.followers.filter(user => {
          if (user.Followers.id === userId) {
            user.Followers.isFollowing = true
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '加入失敗'
        })
      }
    },
    async removeFollowing (userId) {
      try {
        const { data } = await userAPI.removeFollowShip({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$emit('remove-follower-data', userId)
        this.followers.filter(user => {
          if (user.Followers.id === userId) {
            user.Followers.isFollowing = false
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '移除失敗'
        })
      }
    }
  }
}
</script>
