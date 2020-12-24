export const state = () => {
  return {
    cart: []
  }
}

export const getters = {
  /**
   * * Длина массива корзины
   */
  qty (state) {
    return state.cart.length
  },

  /**
   * * Количество товаров в корзине по шт., всего
   */
  qtyTotal (state) {
    return state.cart.reduce((total, el) => {
      return total + parseInt(el.qty)
    }, 0)
  },

  /**
   * * Получение индекса в массиве по id
   */
  indById: (state) => (id) => {
    return state.cart.findIndex(pr => parseInt(pr.id) === id)
  },

  /**
   * * Товар в корзине?
   * boolean
   */
  inCart: (state, getters) => (id) => {
    return getters.indById(id) !== -1
  },

  /**
   * * Количество товара в корзине в шт. по id
   */
  cntInCartById: (state, getters) => (id) => {
    if (getters.inCart(id)) {
      return state.cart[getters.indById(id)].qty
    }
  },

  /**
   * * Полное описание товаров + количество в корзине
   */
  productsDetailed (state, getters, rootState, rootGetters) {
    return state.cart.map(el => {
      const info = rootGetters['products/one'](el.id)
      return { ...info, ...el }
    })
  },

  /**
   * * Общая сумма товаров в корзине
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
      console.log(e)
    }
  },

  async addToCart ({ commit, state, getters }, id) {
    try {
      if (!getters.inCart(id)) {
        const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/add?add=${id}&param1=1`)
        if (response) {
          commit('addToCart', id)
        }
      }
    } catch (e) {
      console.log(e)
    }
  },

  async removeFromCart ({ commit, state, getters }, id) {
    try {
      if (getters.inCart(parseInt(id))) {
        const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/del?del=${id}`)
        if (response) {
          commit('removeFromCart', getters.indById(parseInt(id)))
        }
      }
    } catch (e) {
      console.log(e)
    }
  },

  async changeCnt ({ commit, state, getters }, item) {
    try {
      const { id, qty } = item
      if (getters.inCart(parseInt(id))) {
        const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/upd?upd=${id}&param1=${qty}`)
        if (response) {
          const ind = getters.indById(parseInt(id))
          commit('setCnt', { ind, qty })
        }
      }
    } catch (e) {
      console.log(e)
    }
  },

  async cleanCart ({ commit, state, getters }) {
    try {
      const response = await this.$axios.$post('https://api2.garrykhr.ru/api/cart/delall?delall=1')
      const cnt = getters.qty
      if (response) {
        commit('cleanCart', cnt)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
