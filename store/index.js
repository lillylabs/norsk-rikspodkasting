const contentful = require('contentful')
const SPACE_ID = 'afonij0ohzso'
const ACCESS_TOKEN = 'e04c293e21521cc22324c6a366c047ba88907ff8a0d89d2b2bbe05ca94f84631'

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: SPACE_ID,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: ACCESS_TOKEN
    })

    return client.getEntries({
      content_type: 'podcast'
    })
      .then((response) => {
        console.log(response)
        commit('podcasts/addIds', response.items)
        return response.items
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
