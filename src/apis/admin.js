import { apiHelper } from '../utils/helper'

export default {
  users: {
    get () {
      return apiHelper.get('/admin/users')
    }
  },
  tweet: {
    delete ({ id }) {
      return apiHelper.delete(`/admin/tweets/${id}`)
    }
  }
}
