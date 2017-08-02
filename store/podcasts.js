export const state = () => ({
  ids: [],
  meta: {},
  episodes: []
})

export const mutations = {
  addIds(state, ids) {
    state.ids = ids
  },
  removeId(state, id) {
    state.ids = state.ids.filter(item => id !== item)
    console.log('remove', id)
  },
  addMeta(state, { id, meta }) {
    state.meta[id] = {
      name: meta.collectionName,
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

// list: [
  //   {
  //     cover: 'http://is1.mzstatic.com/image/thumb/Music2/v4/ef/54/9d/ef549d74-b155-5aae-64a8-406d390aee57/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is3.mzstatic.com/image/thumb/Music7/v4/83/9c/55/839c5503-45a6-4f6c-b5f3-d1897b1e44b1/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is2.mzstatic.com/image/thumb/Music71/v4/18/08/34/180834b1-1efc-f5b1-d7e5-f38414ef780a/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is5.mzstatic.com/image/thumb/Music69/v4/a1/28/48/a128489a-c494-a005-55e4-466cfc5ea6d8/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is4.mzstatic.com/image/thumb/Music3/v4/38/85/64/388564a8-c7eb-d34c-e517-4908344b855b/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is1.mzstatic.com/image/thumb/Music2/v4/ef/54/9d/ef549d74-b155-5aae-64a8-406d390aee57/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is3.mzstatic.com/image/thumb/Music7/v4/83/9c/55/839c5503-45a6-4f6c-b5f3-d1897b1e44b1/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is2.mzstatic.com/image/thumb/Music71/v4/18/08/34/180834b1-1efc-f5b1-d7e5-f38414ef780a/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is5.mzstatic.com/image/thumb/Music69/v4/a1/28/48/a128489a-c494-a005-55e4-466cfc5ea6d8/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is4.mzstatic.com/image/thumb/Music3/v4/38/85/64/388564a8-c7eb-d34c-e517-4908344b855b/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is1.mzstatic.com/image/thumb/Music2/v4/ef/54/9d/ef549d74-b155-5aae-64a8-406d390aee57/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is3.mzstatic.com/image/thumb/Music7/v4/83/9c/55/839c5503-45a6-4f6c-b5f3-d1897b1e44b1/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is2.mzstatic.com/image/thumb/Music71/v4/18/08/34/180834b1-1efc-f5b1-d7e5-f38414ef780a/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is5.mzstatic.com/image/thumb/Music69/v4/a1/28/48/a128489a-c494-a005-55e4-466cfc5ea6d8/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is4.mzstatic.com/image/thumb/Music3/v4/38/85/64/388564a8-c7eb-d34c-e517-4908344b855b/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is1.mzstatic.com/image/thumb/Music2/v4/ef/54/9d/ef549d74-b155-5aae-64a8-406d390aee57/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is3.mzstatic.com/image/thumb/Music7/v4/83/9c/55/839c5503-45a6-4f6c-b5f3-d1897b1e44b1/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is2.mzstatic.com/image/thumb/Music71/v4/18/08/34/180834b1-1efc-f5b1-d7e5-f38414ef780a/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is5.mzstatic.com/image/thumb/Music69/v4/a1/28/48/a128489a-c494-a005-55e4-466cfc5ea6d8/source/600x600bb.jpg'
  //   },
  //   {
  //     cover: 'http://is4.mzstatic.com/image/thumb/Music3/v4/38/85/64/388564a8-c7eb-d34c-e517-4908344b855b/source/600x600bb.jpg'
  //   }

