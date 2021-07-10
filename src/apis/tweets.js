import { apiHelper } from '../utils/helper'

export default {
  create ({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  reply ({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
  },
  getReplies ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  getTweets () {
    return apiHelper.get('/tweets')
  },
  getATweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  }
}
