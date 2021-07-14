import { apiHelper } from '../utils/helper'

export default {
  users: {
    get () {
      return apiHelper.get('/admin/users')
    }
  },
  tweet: {
    delete ({ tweetId }) {
      console.log('delete')
      return apiHelper.delete(`/admin/tweets/${tweetId}`)
    },
    get () {
      return apiHelper.get('/admin/tweets')
    }
  }
}
