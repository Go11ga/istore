export const state = () => {
  return {
    productsAll: [],

    PRODUCTS_ON_THE_PAGE: 12
  }
}

export const getters = {
  /**
   * * Получить полный массив товаров в выбранной категории
   * @param { string } category 'jewelery' категория товаров
   * @return {[
   *  {
   *    "id": 1,
   *    "pTitle": "Boyle",
   *    "pSlug": 2684776,
   *    "pPrice": 7811,
   *    "pDesc": "Adipisicing tempor",
   *    "pCategory": "jewelery",
   *    "pMetaDescription": "Boyle",
   *    "pImg": "https://cataas.com/cat?width=350&height=273&i=1"
   *  }
   * ]}
   */
  productsCateg: (state) => (category) => {
    return state.productsAll.filter(el => el.pCategory === category)
  },

  /**
   * * Получить обрезанный массив товаров в выбранной категории для пагинации
   * @param {
   *  page: 1,
   *  category: 'jewelery'
   * }
   * @return {[
   *  {
    *    "id": 1,
    *    "pTitle": "Boyle",
    *    "pSlug": 2684776,
    *    "pPrice": 7811,
    *    "pDesc": "Adipisicing tempor",
    *    "pCategory": "jewelery",
    *    "pMetaDescription": "Boyle",
    *    "pImg": "https://cataas.com/cat?width=350&height=273&i=1"
    *  }
    * ]}
   */
  productsChunk: (state, getters) => (params) => {
    const { page, category } = params
    const start = (page - 1) * state.PRODUCTS_ON_THE_PAGE
    return getters.productsCateg(category).splice(start, state.PRODUCTS_ON_THE_PAGE)
  },

  /**
   * * Получить длину массива с товарами в выбранной категории
   * @param { string } category 'jewelery' категория товаров
   * @return { number }
   */
  paginationLength: (state, getters) => (category) => {
    return Math.ceil(getters.productsCateg(category).length / state.PRODUCTS_ON_THE_PAGE)
  },

  /**
   * * Получить один товар по id
   * @param { number } id id товара
   * @return {
   *  "id": 1,
   *  "pTitle": "Boyle",
   *  "pSlug": 2684776,
   *  "pPrice": 7811,
   *  "pDesc": "Adipisicing tempor",
   *  "pCategory": "jewelery",
   *  "pMetaDescription": "Boyle",
   *  "pImg": "https://cataas.com/cat?width=350&height=273&i=1"
   * }
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
