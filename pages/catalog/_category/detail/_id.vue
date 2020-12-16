<template>
  <div>
    <product-detail :model="product" />
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import ProductDetail from '@/components/product/index'

@Component({
  components: {
    ProductDetail
  }
})
export default class ProductDeatail extends Vue {
  /**
   * * Получить товар по id
   */
  async asyncData (ctx) {
    const id = parseInt(ctx.route.params.id)
    const product = await ctx.store.dispatch('products/getProductById', id)
    return { product }
  }
}
</script>
