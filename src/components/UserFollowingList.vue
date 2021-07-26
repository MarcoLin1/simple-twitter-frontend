<template>
  <div class="users__list__container">
    <div
      v-if="followings[0].Followings.name === null"
      class="users__list__main__container"
    >
      <div
        class="empty-message"
      >
        目前沒有正在跟隨的對象哦！
      </div>
    </div>
    <template v-else>
      <div
        v-for="following in followings"
        :key="following.Followings.id"
        class="users__list__main__wrapper"
      >
        <router-link
          class="users__list__image__wrapper"
          :to="{name: 'user-tweets', params: {id: following.Followings.id}}"
        >
          <img
            :src="following.Followings.avatar | emptyImage"
            alt=""
            class="users__list__image"
          >
        </router-link>
        <div class="users__list__content__wrapper">
          <div class="users__list__name__wrapper">
            <div class="users__list__name">
              {{ following.Followings.name }}
            </div>
            <div class="users__list__account">
              @{{ following.Followings.account }}
            </div>
          </div>
          <div class="users__list__text__wrapper">
            {{ following.Followings.introduction }}
          </div>
          <div class="users__list__button__wrapper">
            <button
              v-if="following.Followings.isFollowing"
              type="submit"
              class="users__list__button__following"
              @click.stop.prevent="removeFollowing(following.Followings.id)"
            >
              正在跟隨
            </button>
            <button
              v-else
              type="submit"
              class="users__list__button__unfollowing"
              @click.stop.prevent="addFollowing(following.Followings.id)"
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
import userAPI from '../apis/users'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [emptyImageFilter],
  props: {
    initialFollowings: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      followings: this.initialFollowings,
      userId: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isFollowing'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  watch: {
    initialFollowings (newValue) {
      this.followings = [
        ...newValue
      ]
    }
  },
  created () {
    const { id } = this.$route.params
    this.userId = id
    this.fetchUser(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await userAPI.getUserFollowing({ userId })
        this.followings = data
        console.log('this followings:', this.followings)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    },
    async removeFollowing (userId) {
      try {
        const { data } = await userAPI.removeFollowShip({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$emit('update-follow-data', userId)
        const response = await userAPI.getUserFollowing({ userId: this.currentUser.id })
        this.followings = response.data
        // this.followings = this.followings.filter(user => {
        //   return user.Followings.id !== userId
        // })
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
