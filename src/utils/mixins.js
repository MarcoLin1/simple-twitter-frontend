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
// 如果發文時間少於 24 小時，顯示幾小時前，不然就顯示幾月幾號
export const shortenTimeFilter = {
  filters: {
    shortenTime (datatime) {
      let time = moment(datatime).locale('zh-tw').startOf('day').fromNow()
      if (time.includes('天')) {
        time = moment(datatime).locale('zh-tw').format('MMMDo')
      }
      return (time || '-')
    }
  }
}
export const shortenNumberFilter = {
  filters: {
    toThousand (num) {
      if (Number(num) > 1000) {
        num = (num / 1000).toFixed(1)
        num = String(num) + 'K'
      }
      return num
    }
  }
}
