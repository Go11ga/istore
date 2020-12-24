export const state = () => {
  return {
    /**
     * * Все товары
     */
    productsAll: [],

    /**
     * * Количество карточек товара на странице
     */
    PRODUCTS_ON_THE_PAGE: 12
  }
}

export const getters = {
  /**
   * * Получить полный массив товаров в выбранной категории
   */
  productsCateg: (state) => (category) => {
    return state.productsAll.filter(el => el.pCategory === category)
  },

  /**
   * * Получить обрезанный массив товаров в выбранной категории для пагинации
   */
  productsChunk: (state, getters) => (params) => {
    const { page, category } = params
    const start = (page - 1) * state.PRODUCTS_ON_THE_PAGE
    return getters.productsCateg(category).splice(start, state.PRODUCTS_ON_THE_PAGE)
  },

  /**
   * * Получить длину массива с товарами в выбранной категории
   */
  paginationLength: (state, getters) => (category) => {
    return Math.ceil(getters.productsCateg(category).length / state.PRODUCTS_ON_THE_PAGE)
  },

  /**
   * * Получить один товар по id
   */
  one: (state) => (id) => {
    const ind = state.productsAll.findIndex(pr => parseInt(pr.id) === parseInt(id))
    // eslint-disable-next-line
    return state.productsAll[ind]
  }
}
export const mutations = {
  setProductsAll (state, products) {
    state.productsAll = products
  }
}

export const actions = {}
