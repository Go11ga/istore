export const state = () => {
  return {
    cart: []
  }
}

export const getters = {
  /**
   * * Длина массива корзины
   * @return { number }
   */
  qty (state) {
    return state.cart.length
  },

  /**
   * * Количество товаров в корзине по шт., всего
   * @return { number }
   */
  qtyTotal (state) {
    return state.cart.reduce((total, el) => {
      return total + parseInt(el.qty)
    }, 0)
  },

  /**
   * * Получение индекса товара в массиве по id
   * @param { number } id id товара
   * @return { number }
   */
  indById: (state) => (id) => {
    // todo проверить API
    // if (typeof (state.cart) !== 'string') {
    return state.cart.findIndex(pr => parseInt(pr.id) === id)
    // }
  },

  /**
   * * Товар в корзине по id
   * @param { numer } id id товара
   * @return { boolean }
   */
  inCart: (state, getters) => (id) => {
    return getters.indById(id) !== -1
  },

  /**
   * * Количество товара в корзине в шт. по id
   * @param { numer } id id товара
   * @return { number }
   */
  cntInCartById: (state, getters) => (id) => {
    if (getters.inCart(id)) {
      return parseInt(state.cart[getters.indById(id)].qty)
    }
  },

  /**
   * * Массив товаров с полным описанием количество в корзине
   * @return {[
   *    { "id": "3",
   *      "pTitle": "Jolene",
   *      "pSlug": 3516266,
   *      "pPrice": 7903,
   *      "pDesc": "Cillum",
   *      "pCategory": "jewelery",
   *      "pMetaDescription": "Jolene",
   *      "pImg": "https://cataas.com/cat?width=350&height=273&i=3",
   *      "qty": "1"
   *    }
   *  ]}
   */

  productsDetailed (state, getters, rootState, rootGetters) {
    return state.cart.map(el => {
      const info = rootGetters['products/one'](el.id)
      return { ...info, ...el }
    })
  },

  /**
   * * Общая сумма товаров в корзине
   * @return { number }
   */
  total (state, getters) {
    return getters.productsDetailed.reduce((total, el) => {
      return total + parseInt(el.pPrice) * parseInt(el.qty)
    }, 0)
  }
}

export const mutations = {
  setCart (state, cart) {
    state.cart = cart
  },

  addToCart (state, id) {
    state.cart.push({ id: id, qty: 1 })
  },

  removeFromCart (state, ind) {
    state.cart.splice(ind, 1)
  },

  setCnt (state, { ind, qty }) {
    // eslint-disable-next-line
    state.cart[ind].qty = qty
  },

  cleanCart (state, cnt) {
    state.cart.splice(0, cnt)
  }
}

export const actions = {
  async getCart ({ commit }) {
    try {
      const cart = await this.$axios.$get('https://api2.garrykhr.ru/api/cart')

      commit('setCart', cart)
    } catch (e) {
      commit('setError', 'Ошибка загрузки данных', { root: true })
    }
  },

  async addToCart ({ commit, getters }, { id }) {
    try {
      if (!getters.inCart(id)) {
        await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/add?add=${id}&param1=1`)

        commit('addToCart', id)
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async removeFromCart ({ commit, getters }, { id }) {
    try {
      if (getters.inCart(parseInt(id))) {
        await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/del?del=${id}`)

        commit('removeFromCart', getters.indById(parseInt(id)))
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async changeCnt ({ commit, state, getters }, { id, qty }) {
    try {
      if (getters.inCart(parseInt(id))) {
        await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/upd?upd=${id}&param1=${qty}`)

        const ind = getters.indById(parseInt(id))
        commit('setCnt', { ind, qty })
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async cleanCart ({ commit, getters }) {
    try {
      await this.$axios.$post('https://api2.garrykhr.ru/api/cart/delall?delall=1')
      const cnt = getters.qty

      commit('cleanCart', cnt)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
