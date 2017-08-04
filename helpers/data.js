import axios from 'axios'
const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup'
const RSS_2_JSON_KEY = 'wi57s1pdwphq2l6fpudnenl15syhlqozbjdxd74f'

export default {
  feedToJson(feedUrl) {
    return axios.get('http://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl) + '&api_key=' + RSS_2_JSON_KEY + '&count=200')
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
          return Promise.resolve(response.data.results[0])
        } else {
          return Promise.reject(id)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  iTunesMetaTransformer(meta) {
    return {
      name: meta.collectionName,
      description: meta.description,
      cover: {
        tiny: meta.artworkUrl30,
        small: meta.artworkUrl100,
        large: meta.artworkUrl600
      },
      feedUrl: meta.feedUrl,
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
