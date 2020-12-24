<template>
  <div v-if="qty !==0">
    <table class="cart__table">
      <thead>
        <tr>
          <th>Изображение</th>
          <th>Наименование</th>
          <th>Цена за ед., руб.</th>
          <th>Изменить</th>
          <th>Итого</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in productsDetailed" :key="item.id">
          <td>
            <n-link :to="`/catalog/${item.pCategory}/detail/${item.id}`">
              <img
                class="cart__img"
                :src="item.pImg"
                :alt="item.pTitle"
              />
            </n-link>
          </td>
          <td>
            {{ item.pTitle }}
          </td>
          <td>
            {{ item.pPrice }}
          </td>
          <td>
            <min-max :model="item" />
          </td>
          <td>
            {{ cntInCartByIdTotal(parseInt(item.id)) * parseInt(item.pPrice) }}
          </td>
          <td>
            <button class="button button--remove" @click.prevent="onRemoveFromCart(item.id)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="cart__total">
      Всего: {{ total }} руб.
    </div>
    <div class="cart__btn">
      <button class="button" @click.prevent="cleanCart">
        Отправить заказ
      </button>
    </div>
  </div>
  <div v-else class="cart__empty">
    Корзина пуста
  </div>
</template>

<script>
import { Component, Vue, Getter, Action } from 'nuxt-property-decorator'
import MinMax from '@/components/cart/minmax/index'

@Component({
  components: {
    MinMax
  }
})
export default class Cart extends Vue {
  /**
   * * Массив товаров для рендеринга с полем qty
   */
  @Getter('cart/productsDetailed')
  productsDetailed

  /**
   * * Полная стоимость корзины
   */
  @Getter('cart/total')
  total

  /**
   * * Длина массива товаров для рендеринга
   */
  @Getter('cart/qty')
  qty

  /**
   * * Удалить товар из корзины
   */
  @Action('cart/removeFromCart')
  removeFromCart

  /**
   * * Удалить товар из корзины с id
   */
  onRemoveFromCart (id) {
    this.removeFromCart(id)
  }

  /**
   * * Количество товаров в корзине для одной позиции
   */
  @Getter('cart/cntInCartById')
  cntInCartById

  /**
   * * Количество товаров в корзине для одной позиции с id
   */
  cntInCartByIdTotal (id) {
    return this.cntInCartById(id)
  }

  /**
   * * Очистить корзину
   */
  @Action('cart/cleanCart')
  cleanCart

  /**
   * * Получить корзину с сервера
   */
  async asyncData (ctx) {
    await ctx.store.dispatch('cart/getCart')
  }
}
</script>

<style lang="scss" scoped>
  .cart__table {
    margin: 0 auto;
    border: 1px solid $dark_grey;
    border-collapse: collapse;

    th, td {
      border: 1px solid $dark_grey;
    }

    th {
      padding: 5px 40px;
    }

    td {
      padding: 5px 40px;
      text-align: center;
    }
  }

  .cart__img {
    display: block;
    max-width: 100px;
    height: auto;
  }

  .cart__total {
    margin: 20px 0;
    font-size: 24px;
    color: $black;
    font-weight: 700;
  }

  .cart__btn {
    width: 200px;
  }

  .cart__empty {
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    color: $black;
  }
</style>
