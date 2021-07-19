import { apiHelper } from './../utils/helper'

export default {
  getPrivateUsers (userId) {
    return apiHelper.get(`/messages/users/${userId}/messaged`)
  },
  getMessages ({ isPrivate, id, listenerId }) {
    console.log('messagesAPI')
    console.log({ isPrivate, id, listenerId })
    return apiHelper.get(`/messages?isPrivate=${isPrivate}&id=${id}&listenerId=${listenerId}`)
  }

}
