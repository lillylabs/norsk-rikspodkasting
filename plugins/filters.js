import Vue from 'vue'
import moment from 'moment'

moment.locale('nb')
moment.updateLocale('nb', {
  monthsShort: 'jan_feb_mars_april_mai_juni_juli_aug_sep_okt_nov_des'.split('_'),
  relativeTime: {
    m: 'ett min',
    mm: '%d min'
  }
})

Vue.filter('capitalize', val => val.toUpperCase())

Vue.filter('formatDate', function (value, format) {
  if (value) {
    return moment(String(value)).format(format)
  }
})

Vue.filter('formatTime', function (value) {
  if (value) {
    // return moment.duration(String(value), 'milliseconds').humanize()
    return moment.duration(parseInt(value), 'seconds').humanize()
  }
})
