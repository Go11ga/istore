<template>
  <div>
    <p>Корзина с сервера: </p>
    <p>{{ cart }}</p>
    <button @click="onAddToCart">
      Add to cart
    </button>
    <hr />
    <button @click="onRemoveFromCart">
      Remove from cart
    </button>
    <hr />
    <button @click="onIncrease">
      +
    </button>
    <hr />
    <button @click="onDecrease">
      -
    </button>
    <hr />
    <button @click="onCleanCart">
      Отправить заказ
    </button>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action } from 'nuxt-property-decorator'

@Component()
export default class Cart extends Vue {
  item = { id: 3, qty: 1 }

  @Getter('cart/cart')
  cart

  async asyncData (ctx) {
    await ctx.store.dispatch('cart/getCart')
  }

  @Action('cart/addToCart')
  addToCart

  async onAddToCart () {
    await this.addToCart(this.item)
  }

  @Action('cart/removeFromCart')
  removeFromCart

  async onRemoveFromCart () {
    const id = this.item.id
    await this.removeFromCart(id)
  }

  @Action('cart/increase')
  increase

  async onIncrease () {
    await this.increase(this.item)
  }

  @Action('cart/decrease')
  decrease

  async onDecrease () {
    await this.decrease(this.item)
  }

  @Action('cart/cleanCart')
  cleanCart

  async onCleanCart () {
    await this.cleanCart()
  }
}
</script>
