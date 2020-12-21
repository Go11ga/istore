<template>
  <div>
    <bread-crumbs :pages="breadcumbs" />
    <product-detail :model="product" />
  </div>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import ProductDetail from '@/components/product/index'
import BreadCrumbs from '@/components/common/ui/breadcrumbs/index'

@Component({
  components: {
    ProductDetail,
    BreadCrumbs
  }
})
export default class ProductDeatail extends Vue {
  /**
   * * Выбранный товар
   */
  @Getter('products/product')
  product

  /**
   * * Текущая категория
   */
  @Getter('catalog/currentCategory')
  currentCategory

  /**
   * * Получить товар по id
   */
  async asyncData (ctx) {
    const id = parseInt(ctx.route.params.id)
    const params = (ctx.route.params)
    await ctx.store.dispatch('products/getProductById', id)
    await ctx.store.dispatch('catalog/getCurrentCategory', params)
  }

  /**
   * * Хлебные крошки для подкатегорий
   */
  get breadcumbs () {
    const category = this.$route.params.category
    const categoryTitle = this.currentCategory.cTitle

    const crumbs = [
      { title: 'Каталог', href: '/catalog' },
      { title: categoryTitle, href: `/catalog/${category}/1` },
      { title: this.product.pTitle, href: '' }
    ]

    return crumbs
  }
}
</script>
