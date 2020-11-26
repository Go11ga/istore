<template>
  <div>
    <h2>Категории</h2>
    <div class="categories">
      <div
        v-for="category in categoriesList"
        :key="category.id"
        class="categories__element"
      >
        <nuxt-link :to="`/category/${category.cSlug}`">
          <p>{{ category.cName }}</p>
          <img :src="category.cImage" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class CategoriesList extends Vue {
  @Getter('categoriesList')
  categoriesList
}
// todo проверить подключение sass и сделать файл с переменными
</script>

<style lang="scss">
  .categories {
    display: flex;
  }
  .categories__element {
    display: flex;
    flex-direction: column;
  }
</style>
