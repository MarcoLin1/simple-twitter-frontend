import { apiHelper } from '../utils/helper'

export default {
  users: {
    get () {
      return apiHelper.get('/admin/users')
    }
  },
  tweet: {
    delete ({ tweetId }) {
      return apiHelper.delete(`/admin/tweets/${tweetId}`)
    }
  }
}
