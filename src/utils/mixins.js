import moment from 'moment'
export const fromNowFilter = {
  filters: {
    fromNow (datatime) {
      return datatime ? moment(datatime).fromNow() : '-'
    }
  }
}
