export const state = () => {
  return {
    /**
     * * Список категорий
     */
    categoriesList: []
  }
}

export const getters = {
  /**
   * * Получить список категорий
   */
  categoriesList (state) {
    return state.categoriesList
  },
  /**
   * * Получить одну категорию по параметру из роутера
   */
  currentCategory: (state) => (category) => {
    return state.categoriesList.find(el => el.cCateg === category)
  }
}

export const mutations = {
  setCategoriesList (state, categoriesList) {
    state.categoriesList = categoriesList
  }
}

export const actions = {}
