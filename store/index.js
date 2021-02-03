export const state = () => ({
  error: null
})

export const getters = {
  error: state => state.error
}

export const mutations = {
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  }
}

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

      /**
       * * Получаем корзину
       */
      const cartPromise = await this.$axios.$get('https://api2.garrykhr.ru/api/cart')

      const [categoriesList, products, cart] = await Promise.all([catalogPromise, productsPromise, cartPromise])

      ctx.commit('catalog/setCategoriesList', categoriesList)
      ctx.commit('products/setProductsAll', products)
      ctx.commit('cart/setCart', cart)
    } catch (e) {
      ctx.commit('setError', 'Ошибка загрузки данных')
    }
  }
}
