import { apiHelper } from './../utils/helper'

export default {
  login ({ account, password }) {
    return apiHelper.post('/users/login', {
      account,
      password
    })
  },
  register ({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      checkPassword
    })
  }
}
