import { apiHelper } from '../utils/helper'
export default {
  add ({ recipientId, subscriberId }) {
    return apiHelper.post('/subscriptions', { recipientId, subscriberId })
  },
  cancel ({ recipientId, subscriberId }) {
    return apiHelper.delete(`/subscriptions/${recipientId}`, { subscriberId })
  }
}
