export const state = () => {}

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit (ctx) {
    try {
      /**
       * * Получаем список категорий для каталога
       */
      const catalogPromise = this.$axios.$get('https://api2.garrykhr.ru/api/categories')
      /**
       * * Получаем все товары
       */
      const productsPromise = this.$axios.$get('https://api2.garrykhr.ru/api/products')
      const [categoriesList, products] = await Promise.all([catalogPromise, productsPromise])

      ctx.commit('catalog/setCategoriesList', categoriesList)
      ctx.commit('products/setProductsAll', products)
    } catch (e) {
      console.log(e)
    }
  }
}
