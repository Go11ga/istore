<template>
  <div class="catalog">
    <h1>Категория: {{ category.cTitle }}</h1>
    <div class="catalog__list">
      <catalog-item
        v-for="product in productsChunk"
        :key="product.id"
        :model="product"
        :category="currentCategory"
      />
    </div>
    <div class="catalog__pagination">
      <pagination
        :current-page="PAGE_NUMBER"
        :total-count="PAGINATION_LENGTH"
      />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import CatalogItem from '@/components/catalog/catalog-item/index'
import Pagination from '@/components/common/ui/pagination/index'

@Component({
  components: {
    CatalogItem,
    Pagination
  }
})
export default class Category extends Vue {
  /**
   * * Массив товаров в текущей категории
   */
  @Getter('products/productsChunk')
  productsChunk

  /**
   * * Длина массива для пагинации
   */
  @Getter('products/PAGINATION_LENGTH')
  PAGINATION_LENGTH

  /**
   * * Номер страницы пагинации
   */
  @Getter('products/PAGE_NUMBER')
  PAGE_NUMBER

  /**
   * * Текущая категория
   */
  @Getter('catalog/currentCategory')
  category

  /**
   * * Название текущей категории, поле cCateg
   */
  get currentCategory () {
    return this.category.cCateg
  }

  async asyncData (ctx) {
    const params = ctx.route.params
    /**
     * * Получаем товары для рендринга
     */
    await ctx.store.dispatch('products/getProductsAll', params)
    /**
     * * Получаем текущую категорию
     */
    ctx.store.dispatch('catalog/getCurrentCategory', params)
  }
}
</script>

<style lang="scss" scoped>
  .catalog {
    padding-bottom: 50px;
  }

  .catalog__list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }

  .catalog__pagination {
    margin-top: 80px;
  }
</style>
