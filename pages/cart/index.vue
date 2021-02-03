<template>
  <div v-if="qty !==0" class="cart">
    <div class="cart__inner">
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
              <button
                class="button button--remove"
                :disabled="inProcess"
                @click.prevent="onRemoveFromCart(item.id)"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cart__total">
      Всего: {{ total }} руб.
    </div>
    <div class="cart__btn">
      <button class="button" @click.prevent="onCleanCart">
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
  },
  head () {
    return {
      title: `Корзина | ${process.env.appName}`
    }
  }
})
export default class Cart extends Vue {
  /**
   * * Переменная для блокировки кнопки
   */
  inProcess = false

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
   * * Количество товаров в корзине для одной позиции
   */
  @Getter('cart/cntInCartById')
  cntInCartById

  /**
   * * Ошибка сервера
   */
  @Getter('error')
  error

  /**
   * * Тост при ошибке сервера
   */
  mounted () {
    if (this.error !== null) {
      this.$message.error(this.error)
    }
  }

  /**
   * * Количество товаров в корзине для одной позиции с id
   */
  cntInCartByIdTotal (id) {
    return this.cntInCartById(id)
  }

  /**
   * * Удалить товар из корзины
   */
  @Action('cart/removeFromCart')
  removeFromCart

  /**
   * * Очистить корзину
   */
  @Action('cart/cleanCart')
  cleanCart

  /**
   * * Удалить товар из корзины с id
   */
  async onRemoveFromCart (id) {
    try {
      this.inProcess = true

      const formData = {
        id
      }

      await this.removeFromCart(formData)

      this.$message.warning('Товар удален из корзины')
    } catch (e) {
      this.$message.error('Ошибка удаления товара из корзины')
    } finally {
      this.inProcess = false
    }
  }

  /**
   * * Очистить корзину
   */
  async onCleanCart () {
    try {
      this.inProcess = true

      await this.cleanCart()

      this.$message.success('Заказ отправлен')
    } catch (e) {
      this.$message.error('Ошибка отправки заказа')
    } finally {
      this.inProcess = false
    }
  }

  /**
   * * Получить корзину с сервера
   */
  async asyncData (ctx) {
    try {
      await ctx.store.dispatch('cart/getCart')
    } catch (e) {

    }
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    margin-bottom: 300px;

    @media (max-width: $point_md) {
      margin-bottom: 100px;
    }

     @media (max-width: $point_sm) {
      margin-bottom: 30px;
    }
  }

  .cart__inner {
    display: flex;
    justify-content: center;
  }

  .cart__table {
    border: 1px solid $dark_grey;
    border-collapse: collapse;

    @media (max-width: $point_md) {
      font-size: 12px;
    }

    th, td {
      border: 1px solid $dark_grey;
    }

    th {
      padding: 5px 40px;

      &:first-child {
        @media (max-width: $point_md) {
          display: none;
        }
      }

      @media (max-width: $point_md) {
        display: none;
      }
    }

    td {
      padding: 5px 40px;
      text-align: center;

      &:first-child {
        @media (max-width: $point_md) {
          display: none;
        }
      }

      @media (max-width: $point_md) {
        padding: 5px 2px;
      }
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

    @media (max-width: $point_md) {
      font-size: 14px;
      text-align: center;
    }
  }

  .cart__btn {
    width: 200px;

    @media (max-width: $point_md) {
      margin: 0 auto;
    }
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
