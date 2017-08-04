import axios from 'axios'
const contentful = require('contentful')
const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup'
const RSS_2_JSON_KEY = 'wi57s1pdwphq2l6fpudnenl15syhlqozbjdxd74f'
const RSS_2_JSON_COUNT = '50' // 20 min 200 max

export default {
  podcastIds() {
    const client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: process.env.contentfulSpaceId,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: process.env.contentfulAccessToken
    })

    return client.getEntries({
      content_type: 'podcast'
    })
      .then((response) => {
        return response.items.map((item) => item.fields.id)
      })
  },
  feedToJson(feedUrl, count) {
    return axios.get('http://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl) + '&api_key=' + RSS_2_JSON_KEY + '&count=' + (count || RSS_2_JSON_COUNT))
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
