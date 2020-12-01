// todo свои категории и товары
// todo комментарии
// todo google lighthouse
// todo обработка ошибок в catch
// todo разделить склад на модули
export const state = () => {
  return {
    categoriesList: [],
    currentCategory: {},
    currentCategoryLength: 3,
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
  async nuxtServerInit ({ commit }) {
    try {
      const categoriesList = await this.$axios.$get('https://my-json-server.typicode.com/Go11ga/istore/categories')
      commit('setCategoriesList', categoriesList)
    } catch (e) {
      console.log(e)
    }
  },
  async getCurrentCategory ({ state, commit }, params) {
    try {
      const category = state.categoriesList.find(el => el.cSlug === params.category)
      // console.log('category')
      // console.log(category)
      // console.log(category.cSlug)
      const products = await this.$axios.$get('/mocks/products.json')

      const productsInner = []

      // console.log('products[0].category_id')
      // console.log(products[0].category_id)

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

      const productsPerPage = 6
      const productsInnerLength = Math.ceil(productsInner.length / productsPerPage)

      const page = params.page

      const start = (params.page - 1) * productsPerPage

      const productsInnerSpliced = productsInner.splice(start, productsPerPage)
      // console.log(productsInnerSpliced)

      // console.log('productsInner')
      // console.log(productsInner)

      // const productsPerPage = 6
      // const start = (params.page - 1) * productsPerPage
      // const end = start + productsPerPage - 1

      // const productsInnerSpliced = productsInner.splice(start, end)

      // const productsInnerLength = Math.ceil(productsInner.length / productsPerPage)

      // const page = params.page

      commit('setCurrentCategory', { category, productsInnerSpliced })
      commit('setCurrentCategoryLength', productsInnerLength)
      commit('setCurrentPage', page)
    } catch (e) {
      console.log(e)
    }
  }
}
