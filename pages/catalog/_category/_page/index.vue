<template>
  <div class="catalog">
    <h1>Категория: {{ currentCategory.cTitle }}</h1>
    <div class="catalog__list">
      <catalog-item
        v-for="product in products"
        :key="product.id"
        :model="product"
      />
    </div>
    <div class="catalog__pagination">
      <pagination
        :current-page="currentPage"
        :total-count="currentCategoryLength"
      />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
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
   * * Выбранная категория
   */
  @Getter('catalog/currentCategory')
  currentCategory

  /**
   * * Длина массива продуктов в текущей категории
   */
  @Getter('catalog/currentCategoryLength')
  currentCategoryLength

  /**
   * * Текущая страница пагинации
   */
  @Getter('catalog/currentPage')
  currentPage

  /**
   * * Массив товаров в текущей категории
   */
  get products () {
    return this.currentCategory.products
  }

  /**
   * * Получение категории с массивом товаров
   */
  async asyncData (ctx) {
    const params = ctx.route.params
    await ctx.store.dispatch('catalog/getCurrentCategory', params)
  }
}
</script>

<style lang="scss" scoped>
  .catalog__list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }

  .catalog__pagination {
    margin-top: 20px;
  }
</style>
