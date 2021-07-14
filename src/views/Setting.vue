<template>
  <div class="main__container">
    <SideNavbar />
    <div class="setting__form__wrapper">
      <div class="setting__top__navbar__wrapper">
        <TopNavbar
          :current-page="currentPage"
          :user-data="currentUser"
          :user-tweets-length="userTweetsLength"
        />
      </div>
      <AccountDetailForm @after-submit="handleAfterSubmit" />
    </div>
  </div>
</template>

<script>
import SideNavbar from './../components/SideNavbar.vue'
import TopNavbar from './../components/TopNavbar.vue'
import AccountDetailForm from './../components/AccountDetailForm.vue'
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import { mapState } from 'vuex'
export default {
  components: {
    SideNavbar: SideNavbar,
    TopNavbar: TopNavbar,
    AccountDetailForm: AccountDetailForm
  },
  data () {
    return {
      currentPage: '帳戶設定',
      userData: [],
      userTweetsLength: ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    // this.fetchCurrentUser()
  },
  methods: {
    // async fetchCurrentUser () {
    //   try {
    //     const { data } = await userAPI.getCurrentUser()
    //     this.currentUser = data
    //   } catch (e) {
    //     console.log(e)
    //     Toast.fire({
    //       icon: 'error',
    //       title: '讀取currentUser失敗'
    //     })
    //   }
    // },
    async handleAfterSubmit (formData) {
      try {
        const { data } = await userAPI.settingUpdate({ userId: this.currentUser.id, formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'main-page' })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料更新失敗'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .main__container {
    display: flex;
    height: 100%;
    width: auto;
  }
  .setting__form__wrapper {
    width: 100%;
    border-left: 1px solid $light-gray;
  }
  .setting__top__navbar__wrapper {
    border-bottom: 1px solid $light-gray;
  }
</style>
