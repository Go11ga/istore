export const state = () => {}

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit (ctx) {
    /**
     * * Получение списка категорий при инициализации Vue
     */
    await ctx.dispatch('catalog/getCategoriesList')
  }
}

// todo google lighthouse
// todo обработка ошибок в catch
