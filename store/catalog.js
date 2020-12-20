export const state = () => {
  return {
    /**
     * * Список категорий
     */
    categoriesList: [],
    /**
     * * Выбранная категория
     */
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

  setCurrentCategory (state, category) {
    state.currentCategory = category
  }
}

export const actions = {
  /**
   * * Получаем список категорий
   */
  async getCategoriesList ({ commit }) {
    try {
      const categoriesList = await this.$axios.$get('https://api2.garrykhr.ru/api/categories')
      commit('setCategoriesList', categoriesList)
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * * Получаем текущую категорию
   * @param {*} params - информация из роутера { category: 'jewelery', page: '1' }
   */
  getCurrentCategory ({ state, commit }, params) {
    /**
     * * Категория
     * {
        id: 1,
        cTitle: 'Ювелирные изделия',
        cCateg: 'jewelery',
        cMetaDescription: 'Мета описание',
        cDesc: 'Описание',
        products: []
        }
    */
    const category = state.categoriesList.find(el => el.cCateg === params.category)
    commit('setCurrentCategory', category)
  }
}
