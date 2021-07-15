import { apiHelper } from '../utils/helper'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user')
  },
  getTopUsers () {
    return apiHelper.get('/users/top')
  },
  getUser ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getUserFollowing ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getUserFollowers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  update ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  settingUpdate ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}/settings`, formData)
  },
  addFollowShip ({ id }) {
    return apiHelper.post('/followships', { id })
  },
  removeFollowShip ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  },
  addLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  removeLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  }
}
