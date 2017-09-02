import Vue from 'vue'

import { distanceInWordsStrict, format, addMilliseconds } from 'date-fns'
var nbLocale = require('date-fns/locale/nb')

Vue.filter('capitalize', val => val.toUpperCase())

Vue.filter('formatDate', function (value, formatting) {
  if (value) {
    return format(new Date(value), formatting, { locale: nbLocale })
  }
})

Vue.filter('formatTime', function (seconds) {
  if (seconds) {
    return distanceInWordsStrict(new Date(), addMilliseconds(new Date(), seconds * 1000), { locale: nbLocale })
  }
})
