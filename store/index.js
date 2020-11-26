export const state = () => {

}

export const getters = {

}

export const mutations = {

}

export const actions = {
  async nuxtServerInit () {
    try {
      const users = await this.$axios.$get('https://my-json-server.typicode.com/Go11ga/categories/categories')
      console.log(users)
    } catch (e) {
      console.log(e)
    }
  }
}
