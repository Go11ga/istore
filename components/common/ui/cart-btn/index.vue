<template>
  <transition name="fade" mode="out-in">
    <button
      v-if="!isInCart"
      :key="1"
      class="button"
      :disabled="inProcess"
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
   * * Переменная для блокировки кнопок
   */
  inProcess = false

  /**
   * * id продукта
   */
  @Prop({ required: true, type: Number })
  id

  /**
   * * Продукт в корзине
   */
  @Getter('cart/inCart')
  inCart

  /**
   * * Продукт в корзине для id
   */
  get isInCart () {
    return this.inCart(this.id)
  }

  /**
   * * Добавить продукт в корзину
   */
  @Action('cart/addToCart')
  addToCart

  /**
   * * Удалить продукт из корзины
   */
  @Action('cart/removeFromCart')
  removeFromCart

  /**
   * * Добавить продукт в корзину с id
   */
  async onAddToCart () {
    try {
      this.inProcess = true

      const formData = {
        id: this.id
      }

      await this.addToCart(formData)

      this.$message.success('Товар добавлен в корзину')
    } catch (e) {
      this.$message.error('Ошибка добавления товара в корзину')
    } finally {
      this.inProcess = false
    }
  }

  /**
   * * Удалить продукт из корзины c id
   */
  async onRemoveFromCart () {
    try {
      this.inProcess = true

      const formData = {
        id: this.id
      }

      await this.removeFromCart(formData)

      this.$message.warning('Товар удален из корзины')
    } catch (e) {
      this.$message.error('Ошибка удаления товара из корзины')
    } finally {
      this.inProcess = false
    }
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
