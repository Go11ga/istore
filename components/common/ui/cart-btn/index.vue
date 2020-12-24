<template>
  <transition name="fade" mode="out-in">
    <button
      v-if="!isInCart"
      :key="1"
      class="button"
      @click.prevent="onAddToCart"
    >
      Добавить в корзину
    </button>
    <button
      v-else
      class="button button--remove"
      @click.prevent="onRemoveFromCart"
    >
      Удалить из корзины
    </button>
  </transition>
</template>

<script>
import { Vue, Component, Prop, Getter, Action } from 'nuxt-property-decorator'

@Component()
export default class CartBtn extends Vue {
  /**
   * * id продукта
   * 1
   */
  @Prop()
  id

  @Action('cart/addToCart')
  addToCart

  /**
   * * Добавить продукт в корзину
   */
  onAddToCart () {
    this.addToCart(this.id)
  }

  @Action('cart/removeFromCart')
  removeFromCart

  /**
   * * Удалить продукт из корзины
   */
  onRemoveFromCart () {
    this.removeFromCart(this.id)
  }

  /**
   * * Продукт в корзине
   * boolean
   */
  @Getter('cart/inCart')
  inCart

  /**
   * * Продукт в корзине для id
   */
  get isInCart () {
    return this.inCart(this.id)
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active{
    animation: fadeIn 0.5s;
  }

  .fade-leave-active{
    animation: fadeOut 0.5s;
  }

  @keyframes fadeIn{
    from { opacity: 0; transform: translate(-10vw) }
    to { opacity: 1; transform: translate(0) }
  }

  @keyframes fadeOut{
    from { opacity: 1; transform: translate(0) }
    to { opacity: 0; transform: translate(10vw) }
  }
</style>
