<template>
  <div>
    <product-detail :model="product" />
  </div>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import ProductDetail from '@/components/product/index'

@Component({
  components: {
    ProductDetail
  }
})
export default class ProductDeatail extends Vue {
  /**
   * * Выбранный товар
   */
  @Getter('products/product')
  product

  /**
   * * Получить товар по id
   */
  async asyncData (ctx) {
    const id = parseInt(ctx.route.params.id)
    await ctx.store.dispatch('products/getProductById', id)
  }
}
</script>
