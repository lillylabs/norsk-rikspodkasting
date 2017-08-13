const axios = require('axios')
const contentful = require('contentful')
const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup'
const RSS_2_JSON_KEY = 'wi57s1pdwphq2l6fpudnenl15syhlqozbjdxd74f'
const RSS_2_JSON_COUNT = '50' // 20 min 200 max

module.exports = {
  initialData() {
    return this.podcastIds().then(ids => {
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
    })
  },
  podcastIds() {
    const client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: 'afonij0ohzso',
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: 'fb79fd325ae791321424da9f8690625825d9e0d294b094ba23a8ba4237f8395b'
    })

    const options = {
      content_type: 'podcast'
    }

    if (process.env.NODE_ENV !== 'production') {
      options.limit = 5
    }

    return client.getEntries(options)
      .then((response) => {
        return response.items.map((item) => item.fields.id)
      })
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
