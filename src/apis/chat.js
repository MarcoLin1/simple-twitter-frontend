import { apiHelper } from './../utils/helper'

export default {
  messages ({ isPrivate, id, listenerId }) {
    console.log('這是api', isPrivate, id, listenerId)
    return apiHelper.get(`/messages?isPrivate=${isPrivate}&id=${id}&listenerId=${listenerId}`)
  },
  chattedUser ({ id }) {
    console.log('這是api chatted user')
    return apiHelper.get(`/messages/users/${id}/messaged`)
  }
}
