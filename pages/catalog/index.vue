<template>
  <div class="main-catalog">
    <h1 class="main-catalog-title">
      Главная страница каталога
    </h1>
    <div class="main-catalog__wrapper">
      <div
        v-for="(categoryChunk, index) in categoryChunks"
        :key="index"
        class="main-catalog__item"
      >
        <catalog-item
          v-for="category in categoryChunk"
          :key="category.id"
          :category-item="category"
          :wide="index % 2 != 0"
          :background="index > categoryChunk.length/2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import { mixChunck } from '@/utils/arrays'
import CatalogItem from '@/components/catalog/catalog-menu-item/index'

@Component({
  components: {
    CatalogItem
  }
})
export default class CatalogApp extends Vue {
  /**
   * * Список категорий
   */
  @Getter('catalog/categoriesList')
  categoriesList

  /**
   * * Делим категории на чанки
   */
  get categoryChunks () {
    return mixChunck(this.categoriesList, 3, 2)
  }
}
</script>

<style lang="scss" scoped>
  .main-catalog__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .main-catalog__item {
    display: flex;
    justify-content: space-between;
    margin: 0 -10px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
