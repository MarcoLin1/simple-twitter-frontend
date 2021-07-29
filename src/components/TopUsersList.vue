<template>
  <div class="user-list-container">
    <div class="user-list-wrapper">
      <p class="title">
        跟隨誰
      </p>
      <div
        v-for="user in (showAll ? users :users.slice(0,6))"
        :key="user.id"
        class="user__list"
      >
        <div class="user__list__content">
          <router-link :to="{name:'user-tweets', params:{id: user.id}}">
            <div class=" user__list__content__avator ">
              <img
                class="avatar-img"
                :src="user.avatar | emptyImage"
                alt=""
              >
            </div>
          </router-link>
          <router-link :to="{name:'user-tweets', params:{id: user.id}}">
            <div class="user__list__content__title">
              <span class="user__list__content__title__name user-name">
                {{ user.name }}
              </span>
              <span
                class="user__list__content__title__account"
              >@{{ user.account }}</span>
            </div>
          </router-link>
        </div>
        <div class="user__list__follow-btn">
          <button
            v-if="user.isFollowing"
            class="following-btn"
            @click="removeFollowing(user.id)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="to-follow-btn"
            @click="addFollowing(user.id)"
          >
            跟隨
          </button>
        </div>
      </div>
      <div
        class="read-more"
        @click="toggleShowAll"
      >
        {{ showAll ? '顯示更少' : '顯示更多' }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
a{
  text-decoration: none;
}
.user-list-container{
  margin: 15px 30px;
}
.user-list-wrapper{
  max-width: 350px;
  min-width: 250px;
  border-radius: 14px;
  background-color: $bg-gray;
  padding: 12px 0;
}
.title{
  @include text-style(18px, 700, $black);
  margin-bottom: 10px;
  line-height: 26px;
  padding: 0 15px;
}
.user__list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  position: relative;
  transition: background-color 0.15s ease-in;
  &:hover{
    background-color: $light-gray;
  }
  &::before{
    content: '';
    height: 1px;
    width: calc(100%);
    background: $light-gray;
    position: absolute;
    top: -1px;
    right: 0;
  }

  &__content{
    display: flex;
    align-items: center;

    &__title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 18px;
      margin-left: 10px;
      &__account{
        @include text-style(15px, 700, $tx-gray, pointer);
      }
    }
  }
}

.read-more{
  @include text-style(15px, normal, $orange, pointer);
  position: relative;
  padding: 12px 15px 3px 15px;
  &::before{
    content: '';
    height: 1px;
    width: 100%;
    background: $light-gray;
    position: absolute;
    top: -1px;
    right: 0;
  }

}
</style>
<script>
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [emptyImageFilter],
  props: {
    topUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showAll: false,
      users: this.topUsers,
      updateData: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    topUsers (newValue) {
      this.users = [
        ...newValue
      ]
    }
  },
  methods: {
    toggleShowAll () {
      this.showAll = !this.showAll
    },
    async addFollowing (userId) {
      try {
        if (this.currentUser.id === userId) {
          Toast.fire({
            icon: 'error',
            title: '不能自己追蹤自己啦!!!'
          })
          return
        }
        const { data } = await userAPI.addFollowShip({ id: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$store.commit('addFollowing')
        // 發送socket reactionNotify事件
        this.$socket.emit('reactionNotify', {
          id: this.currentUser.id,
          receiverId: userId,
          avatar: this.currentUser.avatar,
          name: this.currentUser.name,
          labelName: 'follow'
        })

        this.$emit('update-data', userId)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '新增追蹤失敗'
        })
      }
      this.users.filter((user) => {
        if (user.id === userId) {
          user.isFollowing = true
        }
      })
    },
    async removeFollowing (userId) {
      try {
        const { data } = await userAPI.removeFollowShip({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$store.commit('minusFollowing')
        this.$emit('update-remove-data', userId)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消追蹤失敗'
        })
      }
      this.users.filter((user) => {
        if (user.id === userId) {
          user.isFollowing = false
        }
      })
    }
  }
}

</script>
