export const state = () => {}

export const getters = {}

export const mutations = {}

export const actions = {
  /**
   * * Получить товар по id
   * @param {*} id - id товара
   */
  async getProductById ({ commit }, id) {
    try {
      const products = await this.$axios.$get('/mocks/products.json')
      const product = products.find(el => el.id === id)
      return product
    } catch (e) {
      console.log(e)
    }
  }
}
