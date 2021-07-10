import { apiHelper } from '../utils/helper'

export default {
  getCurrentUser () {
    return apiHelper.get('/get_current_user')
  }
}
