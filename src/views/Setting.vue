<template>
  <div class="main_container">
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
import TopNavbar from './../components/TopNavbar.vue'
import AccountDetailForm from './../components/AccountDetailForm.vue'
import { Toast } from '../utils/helper'
import userAPI from './../apis/users'
import { mapState } from 'vuex'
export default {
  components: {
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
  methods: {

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
  .main_container {
    height: 100%;
    width: 100%;

  }
  .setting__form__wrapper {
    width: 100%;
  }
  .setting__top__navbar__wrapper {
    border-bottom: 1px solid $light-gray;
  }
</style>
