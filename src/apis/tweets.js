import { apiHelper } from '../utils/helper'

export default {
  create ({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  reply ({ id, comment }) {
    return apiHelper.post(`/tweets/${id}/replies`, { comment })
  },
  getReplies ({ id }) {
    return apiHelper.get(`/tweets/${id}/replies`)
  },
  getTweets () {
    return apiHelper.get('/tweets')
  },
  getATweet ({ id }) {
    return apiHelper.get(`/tweets/${id}`)
  }
}
