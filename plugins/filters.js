import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalize', val => val.toUpperCase())

Vue.filter('formatDate', function (value, format) {
  if (value) {
    return moment(String(value)).format(format)
  }
})
