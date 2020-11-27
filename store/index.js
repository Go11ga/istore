// todo свои категории и товары
// todo комментарии
// todo google lighthouse
// todo обработка ошибок в catch
export const state = () => {
  return {
    categoriesList: [],
    currentCategory: {}
  }
}

export const getters = {
  categoriesList (state) {
    return state.categoriesList
  },
  currentCategory (state) {
    return state.currentCategory
  }
}

export const mutations = {
  setCategoriesList (state, categoriesList) {
    state.categoriesList = categoriesList
  },

  setCurrentCategory (state, { category, productsInner }) {
    state.currentCategory = { ...category, products: productsInner }
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    try {
      const categoriesList = await this.$axios.$get('https://my-json-server.typicode.com/Go11ga/istore/categories')
      commit('setCategoriesList', categoriesList)
    } catch (e) {
      console.log(e)
    }
  },
  async getCurrentCategory ({ state, commit }, { route }) {
    try {
      const category = state.categoriesList.find(el => el.cSlug === route)
      const products = await this.$axios.$get('/mocks/products.json')

      const productsInner = []

      products.map(el => {
        if (el.category_id === category.id) {
          productsInner.push({
            id: el.id,
            pName: el.pName,
            pSlug: el.pSlug,
            pPrice: el.pPrice,
            image: `https://source.unsplash.com/300x300/?${el.pName}`
          })
        }
        return productsInner
      })

      commit('setCurrentCategory', { category, productsInner })
    } catch (e) {
      console.log(e)
    }
  }
}
