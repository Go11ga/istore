<template>
  <div>
    <bread-crumbs :pages="breadcumbs" />

    <div class="catalog">
      <h1 class="catalog__title">
        Категория: {{ currentCategoryRender.cTitle }}
      </h1>

      <div class="catalog__list">
        <catalog-item
          v-for="product in productsRender"
          :key="product.id"
          :model="product"
          :category="currentCategoryRender.cCateg"
        />
      </div>

      <div class="catalog__pagination">
        <pagination
          :current-page="pageNumber"
          :total-count="paginationLengthRender"
        />
      </div>
    </div><!-- /.catalog -->
  </div>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import CatalogItem from '@/components/catalog/catalog-item/index'
import Pagination from '@/components/common/ui/pagination/index'
import BreadCrumbs from '@/components/common/ui/breadcrumbs/index'

@Component({
  components: {
    CatalogItem,
    Pagination,
    BreadCrumbs
  },
  head () {
    return {
      title: `${this.currentCategoryRender.cTitle} | ${process.env.appName}`
    }
  }
})
export default class Category extends Vue {
  /**
   * * Параметры роутера
   * { "category": "jewelery", "page": "1" }
   */
  params = this.$route.params

  /**
   * * Массив товаров для рендеринга
   */
  @Getter('products/productsChunk')
  productsChunk

  /**
   * * Размер пагинации
   */
  @Getter('products/paginationLength')
  paginationLength

  /**
   * * Выбранная категория
   */
  @Getter('catalog/currentCategory')
  currentCategory

  /**
   * * Ошибка сервера
   */
  @Getter('error')
  error

  /**
   * * Массив товаров для рендеринга с параметрами роутера { category: 'jewelery', page: '1' }
   *
   */
  get productsRender () {
    return this.productsChunk(this.params)
  }

  /**
   * * Размер пагинации для выбранной категории
   */
  get paginationLengthRender () {
    return this.paginationLength(this.params.category)
  }

  /**
   * * Номер текущей страницы пагинации
   */
  get pageNumber () {
    return this.params.page
  }

  /**
   * * Выбранная категория с параметром
   * {
   * "id": 1,
   * "cTitle": "Ювелирные изделия",
   * "cCateg": "jewelery",
   * "cMetaDescription": "Мета описание",
   * "cDesc": "Описание",
   * "products": []
   * }
   */
  get currentCategoryRender () {
    return this.currentCategory(this.params.category)
  }

  /**
   * * Хлебные крошки для подкатегорий
   */
  get breadcumbs () {
    const category = this.$route.params.category

    const crumbs = [
      { title: 'Каталог', href: '/catalog' },
      { title: this.currentCategoryRender.cTitle, href: `/catalog/${category}/1` }
    ]

    return crumbs
  }

  mounted () {
    if (this.error !== null) {
      this.$message.error(this.error)
    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog {
    padding-bottom: 50px;
  }

  .catalog__title {
    @media (max-width: $point_md) {
      font-size: 24px;
      text-align: center;
    }
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
