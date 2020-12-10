export const state = () => {
  return {
    /**
     * * Список категорий
     */
    categoriesList: [],
    /**
     * * Выбранная категория
     */
    currentCategory: {},
    /**
     * * Количество страниц товаров в выбранной категории
     */
    currentCategoryLength: 3,
    /**
     * * Текущая страница пагинации в выбранной категории
     */
    currentPage: 1
  }
}

export const getters = {
  categoriesList (state) {
    return state.categoriesList
  },
  currentCategory (state) {
    return state.currentCategory
  },
  currentCategoryLength (state) {
    return state.currentCategoryLength
  },
  currentPage (state) {
    return state.currentPage
  }
}

export const mutations = {
  setCategoriesList (state, categoriesList) {
    state.categoriesList = categoriesList
  },

  setCurrentCategory (state, { category, productsInnerSpliced }) {
    state.currentCategory = { ...category, products: productsInnerSpliced }
  },

  setCurrentCategoryLength (state, length) {
    state.currentCategoryLength = length
  },

  setCurrentPage (state, page) {
    state.currentPage = page
  }
}

export const actions = {
  /**
   * * Получаем список категорий
   */
  async getCategoriesList ({ commit }) {
    try {
      const categoriesList = await this.$axios.$get('https://my-json-server.typicode.com/Go11ga/istore/categories')

      commit('setCategoriesList', categoriesList)
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * * Получаем текущую категорию
   * @param {*} params - информация из роутера { category: 'jewelery', page: '1' }
   */
  async getCurrentCategory ({ state, commit }, params) {
    try {
      /**
       * * Категория
       * {
            id: 1,
            cTitle: 'Ювелирные изделия',
            cName: 'Ювелирные изделия',
            cSlug: 'jewelery',
            cMetaDescription: 'Мета описание',
            cDesc: 'Описание',
            products: []
          }
       */
      const category = state.categoriesList.find(el => el.cSlug === params.category)

      /**
       * * JSON всех товаров из static/mocks
       */
      const products = await this.$axios.$get('/mocks/products.json')

      /**
       * * Товары для выбранной категории
       */
      const productsInner = []

      products.map(el => {
        if (el.category_id === category.cSlug) {
          productsInner.push({
            id: el.id,
            pName: el.pName,
            pSlug: el.pSlug,
            pPrice: el.pPrice,
            image: `https://cataas.com/cat?width=350&height=273&i=${el.id}`
          })
        }
        return productsInner
      })

      /**
       * * Количество карточек товара на странице
       */
      const productsPerPage = 8
      /**
       * * Количество страниц пагинации
       */
      const productsInnerLength = Math.ceil(productsInner.length / productsPerPage)

      /**
       * * Номер страницы из роута
       */
      const page = params.page

      /**
       * * Начало обрезанного массива товаров для отображения на странице
       */
      const start = (params.page - 1) * productsPerPage

      /**
       * * Обрезанный массив товаров для отображения на странице
       */
      const productsInnerSpliced = productsInner.splice(start, productsPerPage)

      commit('setCurrentCategory', { category, productsInnerSpliced })
      commit('setCurrentCategoryLength', productsInnerLength)
      commit('setCurrentPage', page)
    } catch (e) {
      console.log(e)
    }
  }
}
