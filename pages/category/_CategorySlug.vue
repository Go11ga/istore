<template>
  <div>
    <h1>Категории</h1>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CategorySlug extends Vue {
  asyncData (ctx) {
    const route = ctx.route.params.CategorySlug
    ctx.store.dispatch('getCurrentCategory', { route })
  }
}
</script>
