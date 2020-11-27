// todo свои категории и товары
// todo комментарии
// todo google lighthouse
// todo обработка ошибок в catch
export const state = () => {
  return {
    categoriesList: []
  }
}

export const getters = {
  categoriesList (state) {
    return state.categoriesList
  }
}

export const mutations = {
  setCategoriesList (state, categoriesList) {
    state.categoriesList = categoriesList
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
  async getCurrentCategory ({ commit }, { route }) {
    try {
      // const products = await this.$axios.$get('https://my-json-server.typicode.com/Go11ga/istore/products')
      // console.log(products)
    } catch (e) {
      console.log(e)
    }
  }
}
