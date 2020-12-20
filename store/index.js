export const state = () => {}

export const getters = {}

export const mutations = {}

export const actions = {
  /**
   * * Инициализации Vue
   */
  async nuxtServerInit (ctx) {
    /**
     * * Получаем список категорий
     */
    await ctx.dispatch('catalog/getCategoriesList')
  }
}
