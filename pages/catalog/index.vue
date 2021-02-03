<template>
  <div class="main-catalog">
    <h1 class="main-catalog__title">
      Каталог
    </h1>
    <div class="main-catalog__wrapper">
      <div
        v-for="(categoryChunk, index) in categoryChunks"
        :key="index"
        class="main-catalog__item"
      >
        <catalog-menu-item
          v-for="category in categoryChunk"
          :key="category.id"
          :model="category"
          :wide="index % 2 != 0"
          :background="index > categoryChunk.length/2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter } from 'nuxt-property-decorator'
import { mixChunck } from '@/utils/arrays'
import CatalogMenuItem from '@/components/catalog/catalog-menu-item/index'

@Component({
  components: {
    CatalogMenuItem
  },
  head: {
    title: `Каталог | ${process.env.appName}`
  }
})
export default class CatalogApp extends Vue {
  /**
   * * Список категорий
   */
  @Getter('catalog/categoriesList')
  categoriesList

  /**
   * * Ошибка сервера
   */
  @Getter('error')
  error

  /**
   * * Делим категории на чанки
   */
  get categoryChunks () {
    return mixChunck(this.categoriesList, 3, 2)
  }

  /**
   * * Показ оишбки при загрузке категорий
   */
  mounted () {
    if (this.error !== null) {
      this.$message.error(this.error)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-catalog__title {
    @media (max-width: $point_sm) {
      text-align: center;
    }
  }

  .main-catalog__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .main-catalog__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $point_md) {
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: 0;
    }
  }
</style>
