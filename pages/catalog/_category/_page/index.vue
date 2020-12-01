<template>
  <div class="catalog">
    <h1>Категория</h1>
    <div class="catalog__list">
      <catalogItem
        v-for="product in products"
        :key="product.id"
        :model="product"
      />
    </div>
    <pagination
      :current-page="currentPage"
      :total-count="currentCategoryLength"
    />
  </div>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import catalogItem from '@/components/catalog/catalog-item/index'
import pagination from '@/components/common/ui/pagination/index'

@Component({
  components: {
    catalogItem,
    pagination
  }
})
export default class Category extends Vue {
  @Getter
  currentCategory

  @Getter
  currentCategoryLength

  @Getter
  currentPage

  get products () {
    return this.currentCategory.products
  }

  async asyncData ({ app, params }) {
    await app.store.dispatch('getCurrentCategory', params)
  }
}
</script>

<style lang="scss" scoped>
  .catalog__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
