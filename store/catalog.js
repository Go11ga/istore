export const state = () => {
  return {
    categoriesList: []
  }
}

export const getters = {
  /**
   * * Массив со списком категорий
   * @return {[
   *  {
   *    "id": 1,
   *    "cTitle": "Ювелирные изделия",
   *    "cCateg": "jewelery",
   *    "cMetaDescription": "Мета описание",
   *    "cDesc": "Описание",
   *    "products": []
   *  }
   * ]}
   */
  categoriesList (state) {
    return state.categoriesList
  },
  /**
   * * Получить объект с одной категорий параметру из роутера
   * @param { string } category 'jewelery' Название категории
   * @return {
   *  {
   *    "id": 1,
   *    "cTitle": "Ювелирные изделия",
   *    "cCateg": "jewelery",
   *    "cMetaDescription": "Мета описание",
   *    "cDesc": "Описание",
   *    "products": []
   *  }
   * }
   * }
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
