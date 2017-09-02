const axios = require('axios')
const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup'
const RSS_2_JSON_KEY = 'wi57s1pdwphq2l6fpudnenl15syhlqozbjdxd74f'
const RSS_2_JSON_COUNT = '50' // 20 min 200 max

module.exports = {
  initialData(ids) {
    const promises = ids.map((id) => {
      var iTunesMeta = {}
      return this.iTunesLookUp(id)
        .then((meta) => {
          iTunesMeta = meta
          return this.feedToJson(meta.url, 20)
        })
        .then((json) => {
          return { id, meta: Object.assign(iTunesMeta, json.feed), episodes: json.items }
        })
    })
    return Promise.all(promises)
  },
  feedToJson(feedUrl, count) {
    return axios.get('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl) + '&api_key=' + RSS_2_JSON_KEY + '&count=' + (count || RSS_2_JSON_COUNT))
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('FeedToJson', error)
        return {
          feed: {},
          items: []
        }
      })
  },
  iTunesLookUp(id) {
    const iTunesId = id.replace('id', '')

    return axios.get(ITUNES_LOOKUP, {
      params: {
        id: iTunesId
      }
    })
      .then((response) => {
        if (response.data.resultCount !== 0) {
          return Promise.resolve(this.iTunesMetaTransformer(response.data.results[0]))
        } else {
          return Promise.resolve(null)
        }
      })
  },
  iTunesMetaTransformer(meta) {
    return {
      title: meta.collectionName,
      description: meta.description,
      cover: {
        tiny: meta.artworkUrl30,
        small: meta.artworkUrl100,
        large: meta.artworkUrl600
      },
      url: meta.feedUrl,
      label: {
        id: meta.artistId,
        name: meta.artistName
      },
      categories: meta.genreIds.map((id, index) => {
        return {
          id: id,
          name: meta.genres[index]
        }
      })
    }
  }
}
