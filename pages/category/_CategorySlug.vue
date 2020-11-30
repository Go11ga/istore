<template>
  <div>
    <h1>Категория</h1>
    <p>{{ category.cName }}</p>
    <p>{{ category.cDesc }}</p>
    <div class="box">
      <div v-for="product in category.products" :key="product.id">
        <ProductBrief :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
// todo заменить asyncData на created или сделать кэширование
// todo проверить метод head
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import ProductBrief from '@/components/category/ProductBrief'

@Component({
  components: {
    ProductBrief
  }
})
export default class CategorySlug extends Vue {
  @Getter('currentCategory')
  category

  asyncData (ctx) {
    const route = ctx.route.params.CategorySlug

    ctx.app.store.dispatch('getCurrentCategory', { route })
  }

  head () {
    return {
      title: this.category.cTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.cMetaDescription
        }
      ]
    }
  }
}
</script>

<style>

.box {
  display: flex;
  flex-wrap: wrap;
}

</style>
