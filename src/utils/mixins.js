import moment from 'moment'
export const fromNowFilter = {
  filters: {
    fromNow (datatime) {
      return datatime ? moment(datatime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}

export const localTimeFilter = {
  filters: {
    localTime (datatime) {
      const time = moment(datatime).locale('zh-tw')
      return (time.format('a h:mm') + '·' + time.format('ll'))
    }
  }
}
