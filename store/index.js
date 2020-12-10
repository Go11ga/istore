export const state = () => {}

export const getters = {}

export const mutations = {}

export const actions = {
  /**
   * * Получение списка категорий при инициализации Vue
   */
  async nuxtServerInit (ctx) {
    await ctx.dispatch('catalog/getCategoriesList')
  }
}
