export const state = () => {
  return {
    /**
     * * Все товары
     */
    productsAll: [],
    /**
     * * Обрезанный массив товаров для рендеринга с пагинацией
     */
    productsChunk: [],
    /**
     * * Количество карточек товара на странице
     */
    PRODUCTS_ON_THE_PAGE: 12,
    /**
     * * Длина пагинации
     */
    PAGINATION_LENGTH: 5,
    /**
     * * Номер страницы пагинации
     */
    PAGE_NUMBER: 1,
    /**
     * * Один товар
     */
    product: {}
  }
}

export const getters = {
  productsAll (state) {
    return state.productsAll
  },
  productsChunk (state) {
    return state.productsChunk
  },
  PAGINATION_LENGTH (state) {
    return state.PAGINATION_LENGTH
  },
  PAGE_NUMBER (state) {
    return state.PAGE_NUMBER
  },
  product (state) {
    return state.product
  }
}

export const mutations = {
  setProductsAll (state, products) {
    state.productsAll = products
  },
  setProductsChunk (state, productsCategSpliced) {
    state.productsChunk = productsCategSpliced
  },
  setPaginationLength (state, paginationLength) {
    state.PAGINATION_LENGTH = paginationLength
  },
  setPageNumber (state, page) {
    state.PAGE_NUMBER = page
  },
  setProduct (state, product) {
    state.product = product
  }
}

export const actions = {
  /**
   * * Получаем все товары
   * @param {*} params - информация из роутера { category: 'jewelery', page: '1' }
   */
  async getProductsAll ({ state, commit }, params) {
    try {
      const products = await this.$axios.$get('https://api2.garrykhr.ru/api/products')
      commit('setProductsAll', products)

      const page = params.page
      commit('setPageNumber', page)

      const category = params.category
      const productsCateg = products.filter(el => el.pCategory === category)
      const paginationLength = Math.ceil(productsCateg.length / state.PRODUCTS_ON_THE_PAGE)
      commit('setPaginationLength', paginationLength)

      const start = (page - 1) * state.PRODUCTS_ON_THE_PAGE
      const productsCategSpliced = productsCateg.splice(start, state.PRODUCTS_ON_THE_PAGE)
      commit('setProductsChunk', productsCategSpliced)
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * * Получить товар по id
   * @param {*} id - id товара
   */
  async getProductById ({ commit }, id) {
    try {
      const product = await this.$axios.$get(`https://api2.garrykhr.ru/api/products/${id}`)
      commit('setProduct', product)
    } catch (e) {
      console.log(e)
    }
  }
}
