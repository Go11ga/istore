<template>
  <div class="card">
    <nuxt-link :to="`/product/${product.pSlug}`">
      <p>{{ product.pName }}</p>
      <img :src="product.image" />
    </nuxt-link>
    <p>Цена {{ product.pPrice }}</p>
  </div>
</template>

<script>
// todo синтаксис и проверка пропов
// todo пагинация
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ProductBrief extends Vue {
  @Prop() product
}
</script>

<style>

</style>
