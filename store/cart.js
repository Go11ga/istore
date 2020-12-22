import { indById } from '~/utils/indbyid'

export const state = () => {
  return {
    cart: []
  }
}

export const getters = {
  cart (state) {
    return state.cart
  }
}

export const mutations = {
  setCart (state, cart) {
    state.cart = cart
  },
  addToCart (state, item) {
    state.cart.push(item)
  },
  removeFromCart (state, ind) {
    state.cart.splice(ind, 1)
  },
  setCnt (state, { ind, newQty }) {
    // eslint-disable-next-line
    state.cart[ind].qty = newQty
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

  async addToCart ({ commit, state }, item) {
    const { id, qty } = item
    const ind = indById(state.cart, id)
    if (ind === -1) {
      const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/add?add=${id}&param1=${qty}`)
      if (response) {
        commit('addToCart', item)
      }
    }
  },

  async removeFromCart ({ commit, state }, id) {
    const ind = indById(state.cart, id)
    if (ind !== -1) {
      const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/del?del=${id}`)
      if (response) {
        commit('removeFromCart', ind)
      }
    }
  },

  async increase ({ commit, state }, item) {
    const { id, qty } = item
    const ind = indById(state.cart, id)
    const newQty = qty + 1
    if (ind !== -1) {
      const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/upd?upd=${id}&param1=${newQty}`)
      if (response) {
        commit('setCnt', { ind, newQty })
      }
    }
  },

  async decrease ({ commit, state }, item) {
    const { id, qty } = item
    const ind = indById(state.cart, id)
    const newQty = qty - 1
    if (ind !== -1) {
      const response = await this.$axios.$post(`https://api2.garrykhr.ru/api/cart/upd?upd=${id}&param1=${newQty}`)
      if (response) {
        commit('setCnt', { ind, newQty })
      }
    }
  },

  async cleanCart ({ commit, state }) {
    const cnt = state.cart.length
    const response = await this.$axios.$post('https://api2.garrykhr.ru/api/cart/delall?delall=1')
    if (response) {
      commit('cleanCart', cnt)
    }
  }
}
