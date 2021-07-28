import { apiHelper } from '../utils/helper'
export default {
  add ({ recipientId, subscriberId }) {
    return apiHelper.post('/subscriptions', { recipientId, subscriberId })
  },
  cancel ({ recipientId, subscriberId }) {
    return apiHelper.delete(`/subscriptions/${recipientId}`, { data: { subscriberId } })
  },
  history ({ id }) {
    return apiHelper.get(`/notifications/${id}`)
  },
  getUnread ({ id }) {
    return apiHelper.get(`/notifications/${id}/unread`)
  },
  cleanUnread ({ id }) {
    return apiHelper.put(`/notifications/${id}/unread`, null)
  }
}
